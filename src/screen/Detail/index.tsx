import React from 'react'
import { View, WebView, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons' // npm i 后需要 react-naitve link react-native-vector-icons一下
import Preference from 'react-native-default-preference'
import getTotalHtml from '../../utils/getTotalHtml.js'
import { CommonHeader } from '../../component/Navigation/Header'
// 页面级组件会被 react-navigation 注入 navigation,screenProps,navigationOptions 三个属性
// 同一页面的 navigation.state.params 是同步一致的，可以用来和页面内其他组件通讯
const IoniconsFontSize: number = 25

class Home extends React.Component<NavigationProps> {
  static _onPress = navigation => {
    Alert.alert(
      '确定退出？',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await Preference.clearMultiple(['account', 'password'])
            navigation.navigate('Launch')
          }
        }
      ],
      { cancelable: true }
    )
  }

  _renderError() {
    alert('加载失败，请重试')
  }

  _navigate(path, params) {
    this.props.navigation.goBack()
  }

  render() {
    const html = this.props.navigation.getParam('content') || ''
    const title = this.props.navigation.getParam('title') || 'CNode爱好者'
    const htmlWithWrapper = getTotalHtml(html)
    return (
      <View style={styles.body}>
        <CommonHeader title={title} navigation={this.props.navigation} />
        <WebView
          source={{ html: htmlWithWrapper }}
          onError={this._renderError}
          renderError={this._renderError}
        />
      </View>
    )
  }
}

const styles = {
  body: {
    flex: 1
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Home

// @ts-ignore
export const CommonOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('title', '基本组件'),
    headerLeft: (
      <Ionicons
        name={'ios-arrow-back'}
        style={{ marginLeft: 10 }}
        color={'white'}
        size={IoniconsFontSize}
        onPress={() => navigation.goBack(null)}
      />
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
}
