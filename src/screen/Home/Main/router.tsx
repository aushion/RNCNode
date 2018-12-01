import React from 'react'
// @ts-ignore
import { ListContainer } from '../../../component/List/ListContainer'
import { getTopicByName } from '../../../service'
class MainScreen extends React.Component<NavigationProps> {
  static navigationOptions = {
    title: '主页',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  state = {
    data: [],
    refresh: true
  }

  componentDidMount = async () => {
    const result = await getTopicByName('topics')
    if (result) {
      this.setState({
        data: result.data,
        refresh: false
      })
    } else {
      this.setState({
        refresh: false
      })
    }
  }

  render() {
    return (
      <ListContainer source={this.state.data} refresh={this.state.refresh} />
    )
  }
}

export default MainScreen
