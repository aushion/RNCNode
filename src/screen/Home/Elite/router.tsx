import React from 'react'
// @ts-ignore
import { ListContainer } from '../../../component/List/ListContainer'
import { getTopicByTabName } from '../../../service'
import { View } from 'react-native'
import { Header } from 'react-native-elements'

class EliteScreen extends React.Component<NavigationProps> {
  static navigationOptions = {
    title: '精华',
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
    const result = await getTopicByTabName('good')
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

  onItemPressed = content => {
    return this.props.navigation.navigate('/detail', { content })
  }

  componentDidMount = () => {
    this.onRefresh()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
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

export default EliteScreen
