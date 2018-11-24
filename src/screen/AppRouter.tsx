import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import Sign from './Login';
import Preference from 'react-native-default-preference';

class LoadingScreen extends React.Component<NavigationProps> {
  constructor(props: any) {
    super(props);
    this._bootstrapAsync();
  }

  componentDidMount = () => {
    SplashScreen.hide();
  };

  async _bootstrapAsync() {
    const value = await Preference.get('account');
    this.props.navigation.navigate(value ? 'App' : 'Login');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

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

const LoginStack = createStackNavigator({
  SignIn: Sign
});

export default createSwitchNavigator(
  {
    Loading: {
      screen: LoadingScreen
    },
    App,
    Login: LoginStack
  },
  {
    initialRouteName: 'Loading'
  }
);
