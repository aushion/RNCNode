/**
 *  @providesModule utils/applicationStateHandler
 */
import {
  Keyboard,
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  Platform,
  DeviceEventEmitter
} from 'react-native';
import KeyboardView from 'react-native-keyboard-view';
import Orientation from 'react-native-orientation';
import RNSafeArea from 'react-native-safe-area-emitter';
import NavigationbarObsever from 'react-native-navigationbar-obsever';

import AppState from 'utils/AppState';

import {
  keyboardShownChanged,
  keyboardFrameChanged,
  keyboardHardwareModeChanged,
  screenDimensionsChanged,
  windowDimensionsChanged,
  orientationDidChange,
  safeAreaChange,
  setNavigationbarSize,
  updateNavigationBarStatus
} from '~redux/actions';

const {
  RNKeyboardEventEmitter
} = NativeModules;
const keyboardEventEmitter = new NativeEventEmitter(RNKeyboardEventEmitter);

export default function (store) {
  function hardwareModeChanged(result) {
    store.dispatch(keyboardHardwareModeChanged(result));
  }

  function keyboardChange(willChange, event) {
    let width = 0;
    let height = 0;
    let screenX = 0;
    let screenY = 0;
    const {
      rootLayout
    } = store.getState().application;

    if (event) {
      const {
        endCoordinates
      } = event;
      width = endCoordinates.width;
      screenX = endCoordinates.screenX;
      screenY = endCoordinates.screenY;
      height = Math.max(0, rootLayout.height + rootLayout.y - screenY);
    } else {
      screenY = rootLayout.height + rootLayout.y;
    }
    store.dispatch(
      keyboardFrameChanged({
        height,
        width,
        screenX,
        screenY,
        animating: willChange
      })
    );
  }

  function keyboardDidHide() {
    store.dispatch(keyboardShownChanged(false));
  }

  function keyboardDidShow() {
    store.dispatch(keyboardShownChanged(true));
  }

  function screenChange({
    screen,
    window
  }) {
    store.dispatch(
      screenDimensionsChanged({
        height: screen.height,
        width: screen.width
      })
    );
    store.dispatch(
      windowDimensionsChanged({
        height: window.height,
        width: window.width
      })
    );
  }

  function navigationDidShowChange({
    navigationbarShow
  }) {
    store.dispatch(updateNavigationBarStatus(navigationbarShow));
  }

  // 监听外接键盘的状态
  if (Platform.OS === 'ios') {
    KeyboardView.getInHardwareKeyboardMode().then(hardwareModeChanged);
    keyboardEventEmitter.addListener(
      'InHardwareKeyboardModeNameEvent',
      hardwareModeChanged
    );
  }

  // 监听键盘高度变化
  if (Platform.OS === 'ios') {
    Keyboard.addListener(
      'keyboardWillChangeFrame',
      keyboardChange.bind(null, true)
    );
    Keyboard.addListener(
      'keyboardDidChangeFrame',
      keyboardChange.bind(null, false)
    );
  }
  Keyboard.addListener('keyboardDidHide', event => {
    Platform.OS !== 'ios' && keyboardChange(false, event);
    keyboardDidHide();
  });
  Keyboard.addListener('keyboardDidShow', event => {
    Platform.OS !== 'ios' && keyboardChange(false, event);
    keyboardDidShow();
  });

  // 监听屏幕高度变化
  Dimensions.addEventListener('change', screenChange);

  // 横竖屏切换
  let prevOrientation;
  Orientation.addOrientationListener(function orientationChange(orientation) {
    if (prevOrientation !== orientation) {
      store.dispatch(orientationDidChange(orientation));
      prevOrientation = orientation;
    }
  });
  store.dispatch(orientationDidChange(Orientation.getInitialOrientation()));

  // safeArea 初始化和监听
  store.dispatch(safeAreaChange(RNSafeArea.rootSafeArea));
  RNSafeArea.addRootSafeAreaListener(result => {
    store.dispatch(safeAreaChange(result));
  });

  // android 虚拟导航栏  初始化和监听
  if (Platform.OS === 'android') {
    NavigationbarObsever.getNavigationbarSize(size => {
      // size值是虚拟导航栏的高度，是否显示根据 isShow 去判断
      store.dispatch(setNavigationbarSize(size));
    });

    NavigationbarObsever.isNavigationbarShow(isShow => {
      store.dispatch(updateNavigationBarStatus(isShow));
    });

    NavigationbarObsever.bindListener(isOK => {
      isOK &&
        DeviceEventEmitter.addListener(
          'navigationbarDidShowChange',
          navigationDidShowChange
        );
    });
  }

  // 每次从后台进入前台刷新状态。
  let appState = null;
  AppState.addEventListener('change', nextAppState => {
    if (nextAppState === 'active' && appState === 'background') {
      Orientation.getOrientation((error, orientation) => {
        // orientation
        if (prevOrientation !== orientation) {
          store.dispatch(orientationDidChange(orientation));
          prevOrientation = orientation;
        }
      });
    }
    appState = nextAppState;
  });
}
