import { createStackNavigator, SwitchNavigator } from 'react-navigation';
import React from 'react';
import SplashScreen from 'react-native-splash-screen'
import {
  ActivityIndicator,
  StatusBar,
  View
} from 'react-native';

import Sign from './Login';
import Preference from 'react-native-default-preference';

const App = createStackNavigator(
  {
    '/tab-navigation': {
      screen: require('./TabNavigationRouter').default
    }
  },
  {
    initialRouteName: '/tab-navigation',
    headerMode: 'none'
  }
);

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount = () => {
    SplashScreen.hide();
  };

  // Fetch the token from storage then navigate to our appropriate place
  async _bootstrapAsync() {
    const value = await Preference.get('account');
    this.props.navigation.navigate(value ? 'App' : 'Auth');
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    SignIn: Sign
  },
  {
    headerMode: 'none'
  }
);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: App,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

