import React, { Component } from "react"
import { View, Text, KeyboardAvoidingView, ViewStyle } from "react-native"
import { withNavigation } from "react-navigation"
import Preference from "react-native-default-preference"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements"
import SplashScreen from "react-native-splash-screen"

enum Behavior {
  Padding = "padding",
  Position = "position"
}
interface State {
  account: string
  accountError: string
  password: string
  passwordError: string
  behavior: Behavior
}

class List extends Component<{}, State> {
  readonly state: State = {
    account: "",
    accountError: "",
    password: "",
    passwordError: "",
    behavior: Behavior.Position
  }

  _onChangeTextAccount = (account: string) => {
    this.setState({
      account,
      accountError: ""
    })
  }
  _onChangeTextPassword = (password: string) => {
    this.setState({
      password,
      passwordError: ""
    })
  }

  componentDidMount = () => {
    SplashScreen.hide()
  }

  _login = async () => {
    const { account, password } = this.state
    if (!account) {
      this.setState({
        accountError: "账号不能为空"
      })

      return
    }
    if (!password) {
      this.setState({
        passwordError: "密码不能为空"
      })

      return
    }
    await Preference.setMultiple({
      account,
      password
    })
    // this.props.navigation.navigate("/tab-navigation")
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.body} behavior={this.state.behavior}>
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
    )
  }
}

const styles = {
  body: {
    flex: 1,
    justifyContent: "center"
  } as ViewStyle,
  head: {
    marginTop: 20,
    height: 50,
    lineHeight: 50,
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center"
  } as ViewStyle,
  buttonStyle: {
    marginTop: 20
  } as ViewStyle
}

export default withNavigation(List)
