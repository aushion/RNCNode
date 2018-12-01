import { createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons' // npm i 后需要 react-naitve link react-native-vector-icons一下
import React from 'react'

const IoniconsFontSize: number = 25
export default createBottomTabNavigator(
  {
    '/main': {
      screen: require('./Main/router').default
    },
    '/elite': {
      screen: require('./Elite/router').default
    },
    '/share': {
      screen: require('./Share/router').default
    },
    '/recruit': {
      screen: require('./Recruit/router').default
    },
    '/question': {
      screen: require('./Question/router').default
    }
  },
  {
    initialRouteName: '/main',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === '/elite') {
          iconName = `logo-html5`
        } else if (routeName === '/main') {
          iconName = `logo-css3`
        } else if (routeName === '/share') {
          iconName = 'logo-javascript'
        } else if (routeName === '/recruit') {
          iconName = `logo-apple`
        } else {
          iconName = 'logo-apple'
        }

        return (
          <Ionicons name={iconName} size={IoniconsFontSize} color={tintColor} />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray'
    }
  }
)
