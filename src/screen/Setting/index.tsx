import React from 'react'
import { View, Button, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons' // npm i 后需要 react-naitve link react-native-vector-icons一下
import Preference from 'react-native-default-preference'

// 页面级组件会被 react-navigation 注入 navigation,screenProps,navigationOptions 三个属性
// 同一页面的 navigation.state.params 是同步一致的，可以用来和页面内其他组件通讯
const IoniconsFontSize: number = 25

class Setting extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', '基本组件'),
      headerRight: (
        <Ionicons
          name={'ios-power'}
          style={{ marginRight: 10 }}
          color={'white'}
          size={IoniconsFontSize}
          onPress={() => Setting._onPress(navigation)}
        />
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
      // headerMode: 'none'
    }
  }

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

  _navigate() {
    this.props.navigation.navigate(path, params)
  }

  render() {
    return (
      <View style={styles.body}>
        <Button
          title={'Text setting'}
          onPress={this._navigate.bind(this, '/rnComponent/text', {
            title: 'Text'
          })}
        />
      </View>
    )
  }
}

const styles = {
  body: {
    flex: 1,
    marginTop: 50
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Setting
