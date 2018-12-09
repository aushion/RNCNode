/**
 *  @providesModule constants/Styles
 */

import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

import {
  getSdkInt
} from 'vendors/Shimo';
import {
  safeArea
} from 'utils/device';

const IS_ANDROID = Platform.OS === 'android';
const APPBAR_HEIGHT = IS_ANDROID ? 56 : 44;
const STATUSBAR_HEIGHT = IS_ANDROID ?
  getSdkInt() >= 19 ?
  safeArea.top || 20 :
  0 :
  safeArea.top || 20;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const appSize = {
  statusBarHeight: STATUSBAR_HEIGHT,
  appBarHeight: APPBAR_HEIGHT,
  appHeaderHeight: STATUSBAR_HEIGHT + APPBAR_HEIGHT
};

const baseHeader = {
  backgroundColor: '#fff',
  shadowColor: 'transparent',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
  height: appSize.appHeaderHeight,
  paddingTop: appSize.statusBarHeight
};

const navigatorStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fafafa',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },

  header: {
    ...baseHeader,
    borderBottomColor: '#E9E9EF',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  popoverHeader: {
    ...baseHeader,
    borderBottomColor: '#E9E9EF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: appSize.appBarHeight,
    paddingTop: 0
  },

  popoverBorderLessHeader: {
    ...baseHeader,
    borderBottomWidth: 0,
    height: appSize.appBarHeight,
    paddingTop: 0
  },

  modalBorderLessHeader: {
    ...baseHeader,
    borderBottomWidth: 0,
    height: 51,
    paddingTop: 9
  },

  borderLessHeader: {
    ...baseHeader,
    borderBottomWidth: 0
  },

  headerTitleStyle: {
    marginHorizontal: Platform.OS === 'ios' ? 16 : 46,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  cardTransparentStyle: {
    backgroundColor: 'transparent'
  }
});

const styleConstants = {
  mainColor: '#41464B'
};

const commonStyles = StyleSheet.create({
  // 防止安卓在 input 被键盘遮挡的时候会自动改变 Activity 的 layout
  inputFocusAvoid: IS_ANDROID ?
    {
      bottom: SCREEN_HEIGHT,
      transform: [{
        translateY: SCREEN_HEIGHT
      }]
    } :
    {},
  textButtonColor: {
    color: styleConstants.mainColor
  },
  // 文字内容的按钮 disabled 状态
  textButtonDisabled: {
    color: 'rgba(65,70,75,0.3)'
  },
  // 图片内容的按钮 disabled 状态
  imageButtonDisabled: {
    opacity: 0.3
  }
});

export {
  styleConstants,
  navigatorStyles,
  appSize,
  commonStyles
};
