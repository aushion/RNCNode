import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

const RNComponentNavigator = createStackNavigator(
  {
    '/rnComponent/index': {
      screen: require('./rnComponent/Index').default
    }
  },
  {
    initialRouteName: '/rnComponent/index',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default class RNNavigator extends Component<NavigationProps> {
  static router = RNComponentNavigator.router;
  static navigationOptions = {
    tabBarLabel: '基本组件'
  };
  render() {
    // @ts-ignore
    return <RNComponentNavigator navigation={this.props.navigation} />;
  }
}
