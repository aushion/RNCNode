import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'

import Login from './Login'
import Home from './Home/router'
import Preference from 'react-native-default-preference'

class Launch extends React.Component<NavigationProps> {
  constructor(props: any) {
    super(props)
    this._bootstrapAsync()
  }

  async _bootstrapAsync() {
    const value = await Preference.get('account')
    SplashScreen.hide()
    this.props.navigation.navigate(value ? 'Home' : 'Login')
  }

  render() {
    return null
  }
}

// const Home = createStackNavigator(
//   {
//     '/home': {
//       screen: require('./Home/router').default
//     }
//   },
//   {
//     initialRouteName: '/home',
//     headerMode: 'none'
//   }
// )

export default createSwitchNavigator(
  {
    Launch,
    Home,
    Login
  },
  {
    initialRouteName: 'Launch'
  }
)
