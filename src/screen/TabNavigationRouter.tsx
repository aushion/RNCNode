import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'; // npm i 后需要 react-naitve link react-native-vector-icons一下
import React from 'react';

export default createBottomTabNavigator(
  {
    '/rnComponent': {
      screen: require('./RNComponentRouter').default
    }
  },
  {
    initialRouteName: '/rnComponent',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      /* eslint-disable */
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '/rnComponent') {
          iconName = `logo-html5`;
        } else if (routeName === '/rnApi') {
          iconName = `logo-css3`;
        } else if (routeName === '/thirdComponent') {
          iconName = 'logo-javascript';
        } else {
          iconName = `logo-apple`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray'
    }
  }
);
