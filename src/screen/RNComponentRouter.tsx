import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

const RNComponentNavigator = createStackNavigator(
  {
    '/rnComponent/index': {
      screen: require('../screens/rnComponent/Index').default
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

export default class RNNavigator extends Component {
  static router = RNComponentNavigator.router;
  static navigationOptions = {
    tabBarLabel: '基本组件'
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <RNComponentNavigator navigation={this.props.navigation} />;
  }
}
