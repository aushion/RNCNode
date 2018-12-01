import React from 'react'
// @ts-ignore
import { ListContainer } from '../../../component/List/ListContainer'
import { getTopicByTabName } from '../../../service'
import { View } from 'react-native'

class ShareScreen extends React.Component<NavigationProps> {
  static navigationOptions = {
    title: '分享',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  state = {
    data: [],
    refreshing: true
  }

  onRefresh = async () => {
    const result = await getTopicByTabName('share')
    if (result) {
      this.setState({
        data: result.data,
        refreshing: false
      })
    } else {
      this.setState({
        refreshing: false
      })
    }
  }

  onEndReached = () => {
    return this.onRefresh()
  }

  onItemPressed = () => {
    return this.props.navigation.navigate('/detail')
  }

  componentDidMount = () => {
    this.onRefresh()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListContainer
          source={this.state.data}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onItemPressed={this.onItemPressed}
        />
      </View>
    )
  }
}

export default ShareScreen
