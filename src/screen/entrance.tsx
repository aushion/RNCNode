import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import Login from './Login'
import Preference from 'react-native-default-preference'
import { Provider } from 'react-redux'
import getStore from '../store/getStore'
import { View } from 'react-native'
import CardStackTransitionConfigure from '../utils/CardStackTransitionConfigure.js'

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

const Home = createStackNavigator(
  {
    '/home': {
      screen: require('./Topic/router').default
    },
    '/setting': {
      screen: require('./Setting').default
    },
    '/detail': {
      screen: require('./Detail').default
    }
  },
  {
    initialRouteName: '/home',
    headerMode: 'none',
    transitionConfig: CardStackTransitionConfigure
  }
)

const AppNavigator = createSwitchNavigator(
  {
    Launch,
    Home,
    Login
  },
  {
    initialRouteName: 'Launch'
  }
)

class AppContainer extends Component<NavigationProps> {
  static router = AppNavigator.router
  private store = getStore()
  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator navigation={this.props.navigation} />
      </Provider>
    )
  }
}

export default AppContainer
