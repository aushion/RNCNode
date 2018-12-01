import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import React,{Component} from 'react'
import SplashScreen from 'react-native-splash-screen'
import Ionicons from 'react-native-vector-icons/Ionicons' // npm i 后需要 react-naitve link react-native-vector-icons一下
import Login from './Login'
import Preference from 'react-native-default-preference'
import {View} from 'react-native'
import { Provider } from 'react-redux';
import getStore from '../store/getStore';

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
      screen: require('./Home/router').default,
      path: '/home',
      navigationOptions: {
        title: 'CNode 社区',
        headerRight: null,
        headerStyle:{
          backgroundColor:'green',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      },
    },
    '/setting':{
      screen: require('./Setting').default
    },
    '/detail':{
      screen: require('./Detail').default
    }
  },
  {
    initialRouteName: '/home',
    headerMode: 'screen',
  }
)


const EntranceNavigator = createSwitchNavigator(
  {
    Launch,
    Home,
    Login
  },
  {
    initialRouteName: 'Launch'
  }
)

export default class EntranceNavigatorWithStore extends Component{
  private store = getStore()
  render(){
    return (
      <View>
        {/* <Provider store={this.store}> */}
          <EntranceNavigator />
        {/* </Provider> */}
      </View>
    )
  }
}
