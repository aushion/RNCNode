import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Preference from 'react-native-default-preference';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
  // @ts-ignore
} from 'react-native-elements';

const initialState = { 
  account: '',
  accountError: null,
  password: '',
  passwordError: null,
  behavior: 'padding' || 'position' || ''
}
const initProps = {
  navigation:{
    navigate:path=>{}
  }
}
type State = Readonly<typeof initialState>
type Props = Readonly<typeof initProps>

const a = 'position'
const b = 'padding'
const c = 'height'

type test = typeof a | typeof b | typeof c;



class List extends Component<Props,State> {

  readonly state: State = initialState

  _onChangeTextAccount = account => {
    this.setState({
      account,
      accountError: null
    });
  };
  _onChangeTextPassword = password => {
    this.setState({
      password,
      passwordError: null
    });
  };
  _login = async () => {
    const { account, password } = this.state;
    if (!account) {
      this.setState({
        accountError: '账号不能为空'
      });
      return;
    }
    if (!password) {
      this.setState({
        passwordError: '密码不能为空'
      });
      return;
    }
    await Preference.setMultiple({
      account,
      password
    });
    this.props.navigation.navigate('/tab-navigation');
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.body} behavior={(this.state.behavior as test)}>
        <View>
          <Text style={styles.head}>欢迎来到RNDemo</Text>
        </View>
        <FormLabel>账号：</FormLabel>
        <FormInput onChangeText={this._onChangeTextAccount} />
        <FormValidationMessage>{this.state.accountError}</FormValidationMessage>

        <FormLabel>密码：</FormLabel>
        <FormInput onChangeText={this._onChangeTextPassword} />
        <FormValidationMessage>
          {this.state.passwordError}
        </FormValidationMessage>

        <Button style={styles.buttonStyle} title="登陆" onPress={this._login} />
      </KeyboardAvoidingView>
    );
  }
}
const StyleLint = {
  body:{},
  head:{},
  buttonStyle:{}
}
type Style = typeof StyleLint
const styles:Style = {
  body: {
    flex: 1,
    justifyContent: 'center'
  },
  head: {
    marginTop: 20,
    height: 50,
    lineHeight: 50,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonStyle: {
    marginTop: 20
  }
};

export default withNavigation(List);
