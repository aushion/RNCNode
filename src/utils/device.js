/**
 *  @providesModule utils/device
 */

import DeviceInfo from 'react-native-device-info';
import RNSafeArea from 'react-native-safe-area-emitter';
import {
  Dimensions,
  Platform
} from 'react-native';

const PHONE_MAX_WIDTH = 450;
const IS_IPAD = Platform.OS === 'ios' && DeviceInfo.isTablet();
const iosSysVersion =
  (Platform.OS === 'ios' && parseInt(Platform.Version, 10)) || 0;
let tabBarPadding = getTabBarPadding();
let scenePadding = getScenePadding();
let windowWidth = getWindowWidth();
let windowHeight = getWindowHeight();
let windowScale = getWindowScale();
// 0 portrait; 1 landscape
let orientation = getOrientation();
const safeArea = RNSafeArea.rootSafeArea;

function getWindowWidth(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  return window.width;
}

function getWindowHeight(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  return window.height;
}

function getWindowScale(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  return window.scale;
}

function getTabBarPadding(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  const minWidth = Math.min(window.width, window.height);
  let padding = 0;
  if (minWidth > PHONE_MAX_WIDTH) {
    padding = (window.width - 80 * 4) / 10;
  }
  return padding;
}

function getScenePadding(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  let padding = 0;
  if (window.width > PHONE_MAX_WIDTH) {
    if (window.width > window.height) {
      padding = window.width * 0.12;
    } else {
      padding = window.width * 0.08;
    }
  }
  return padding;
}

function getOrientation(window = null) {
  if (window === null) {
    window = Dimensions.get('window');
  }
  return window.width > window.height ? 1 : 0;
}

Dimensions.addEventListener('change', change => {
  const {
    window
  } = change;
  tabBarPadding = getTabBarPadding(window);
  scenePadding = getScenePadding(window);
  windowWidth = getWindowWidth(window);
  windowHeight = getWindowHeight(window);
  orientation = getOrientation(window);
});

export {
  IS_IPAD,
  iosSysVersion,
  tabBarPadding,
  scenePadding,
  windowWidth,
  windowHeight,
  windowScale,
  orientation,
  safeArea,
  getTabBarPadding,
  getScenePadding,
  getWindowWidth,
  getOrientation
};
