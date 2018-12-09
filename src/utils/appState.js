/**
 *  @providesModule utils/AppState
 */

import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  AppState as RNAppState
} from 'react-native';

const ShimoEmitter = Platform.OS === 'android' && NativeModules.ShimoEmitter;

class AppState {
  constructor() {
    if (Platform.OS === 'android') {
      ShimoEmitter && ShimoEmitter.getCurrentState((appStateData) => {
        this.currentState = appStateData.app_state || 'active';
      });
    } else {
      this.currentState = (RNAppState.currentState && RNAppState.currentState !== 'unknown') ? RNAppState.currentState : 'active';
    }

    this._eventHandlers = {
      change: new Map()
    };
    this.addEventListener('change', (appState) => {
      this.currentState = appState || 'active';
    });
  }

  currentState = 'active';
  _eventHandlers = null;
  _eventEmitter = null;

  /**
   * Android 上 type 为 change 时用自定义的，其它的用 RN 自带的
   *
   * @param type
   * @param handler
   */
  addEventListener = (type, handler) => {
    if (type === 'change' && Platform.OS === 'android') {
      if (!this._eventEmitter) {
        this._eventEmitter = new NativeEventEmitter(ShimoEmitter);
      }
      const listener = this._eventEmitter.addListener('shimoAppStateDidChange',
        (appStateData) => {
          handler(appStateData.app_state || 'active');
        });
      this._eventHandlers[type].set(handler, listener);
      return listener;
    } else {
      return RNAppState.addEventListener(type, handler);
    }
  };

  /**
   * Android 上 type 为 change 时用自定义的，其它的用 RN 自带的
   *
   * @param type
   * @param handler
   */
  removeEventListener = (type, handler) => {
    if (type === 'change' && Platform.OS === 'android') {
      if (!this._eventHandlers[type].has(handler)) {
        return;
      }
      this._eventHandlers[type].get(handler).remove();
      this._eventHandlers[type].delete(handler);
    } else {
      RNAppState.removeEventListener(type, handler);
    }
  };
}

export default new AppState();
