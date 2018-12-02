import React from 'react'
// @ts-ignore
import { ListContainer } from '../../../component/List/ListContainer'
import { getTopicByTabName } from '../../../service'
import { View } from 'react-native'
import { CommonHeader } from '../../../component/Navigation/Header'
import { CustomAvatar } from '../../../component/Navigation/Button'
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
    currentPage: 1,
    refreshing: true
  }

  loadData = async (page: number = 1, clear?: boolean) => {
    const result = await getTopicByTabName('good', { page })
    if (result) {
      this.setState({
        data: clear ? result.data : this.state.data.concat(result.data),
        currentPage: page,
        refreshing: false
      })
    } else {
      this.setState({
        refreshing: false,
        currentPage: page === 1 ? 1 : page - 1
      })
    }
  }

  onRefresh = () => {
    this.loadData(1, true)
  }

  onEndReached = () => {
    return this.loadData(this.state.currentPage + 1)
  }

  onItemPressed = (content, title) => {
    return this.props.navigation.navigate('/detail', { content, title })
  }

  componentDidMount = () => {
    this.loadData()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CommonHeader
          title={'CNode 社区'}
          navigation={this.props.navigation}
          leftComponent={
            <CustomAvatar
              onPress={() => {
                this.props.navigation.navigate('/setting', {
                  transition: 'vertical'
                })
              }}
            />
          }
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
