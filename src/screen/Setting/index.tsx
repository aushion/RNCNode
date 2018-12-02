import React from 'react'
import { FlatList, Alert, View } from 'react-native'
import Preference from 'react-native-default-preference'
import { List, ListItem, Avatar, Button } from 'react-native-elements'
import { CommonHeader } from '../../component/Navigation/Header'

const IoniconsFontSize: number = 25

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]
class Setting extends React.Component {
  static navigationOptions = {
    mode: 'modal'
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

  _navigate(path) {
    this.props.navigation.navigate(path)
  }

  renderRow({ item }) {
    return (
      <ListItem
        avatar={
          <Avatar
            rounded
            source={item.avatar_url && { uri: item.avatar_url }}
            title={item.name[0]}
          />
        }
        title={item.name}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CommonHeader
          title="个人中心"
          navigation={this.props.navigation}
          close
        />
        <List>
          <FlatList
            data={list}
            renderItem={this.renderRow}
            keyExtractor={item => item.name}
          />
        </List>
        <Button
          onPress={() => this._navigate('Login')}
          raised
          title="退出登录"
          style={{ marginTop: 20 }}
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
