import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getTopicByTabNameAction, clearTopicAction } from '../../store/actions'
import { ListContainer } from '../../component/List/ListContainer'
import { View } from 'react-native'
import { CommonHeader } from '../../component/Navigation/Header'
import { CustomAvatar } from '../../component/Navigation/Button'
import Immutable from 'immutable'

export default function({ tab = 'all', title = '精华' }) {
  class HOC extends PureComponent {
    static navigationOptions = {
      title,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }

    state = {
      refreshing: true
    }

    currentPage = 1

    loadData = async (page: number = 1, isResetCurrentPage) => {
      const {
        payload: { success }
      } = await this.props.getTopicByTabNameAction({ page })

      if (isResetCurrentPage) {
        this.currentPage = 1
      }

      if (success) {
        page !== 1 && (this.currentPage = page)
        this.setState({
          refreshing: false
        })
      } else {
        page !== 1 && (this.currentPage = page - 1)
        this.setState({
          refreshing: false
        })
      }
    }

    onRefresh = () => {
      this.props.clearTopicAction({ tab })
      this.loadData(1, true)
    }

    onEndReached = () => {
      return this.loadData(this.currentPage + 1)
    }

    onItemPressed = (content, title) => {
      return this.props.navigation.navigate('/detail', { content, title })
    }

    componentDidMount = async () => {
      this.loadData(1, true)
    }

    $tempList = Immutable.List()

    componentWillReceiveProps(nextProps: Props): void {
      if (nextProps.$list.size === 0 && this.props.$list.size !== 0) {
        this.$tempList = this.props.$list
      }
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
            source={
              this.props.$list.size === 0 ? this.$tempList : this.props.$list
            }
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.onEndReached}
            onItemPressed={this.onItemPressed}
          />
        </View>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      $list: state.getIn(['topic', tab])
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab })),
      clearTopicAction: ({ tab }) => dispatch(clearTopicAction({ tab }))
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOC)
}
