import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTopicByTabNameAction, clearTopicAction } from '../../store/actions'
import { ListContainer } from '../../component/List/ListContainer'
import { View } from 'react-native'
import { CommonHeader } from '../../component/Navigation/Header'
import { CustomAvatar } from '../../component/Navigation/Button'
import { is } from 'immutable'

export default function({ tab = '', title = '精华' }) {
  const mapStateToProps = (state, ownProps) => {
    return {
      $list: state.topic
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getTopicByTabNameAction: ({ page }) =>
        dispatch(getTopicByTabNameAction({ page, tab })),
      clearTopicAction: () => dispatch(clearTopicAction())
    }
  }

  class HOC extends Component {
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
      this.props.clearTopicAction()
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

    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
      const thisProps = this.props || {},
        thisState = this.state || {}

      if (!nextProps.$list.size) {
        return false
      }

      if (
        Object.keys(thisProps).length !== Object.keys(nextProps).length ||
        Object.keys(thisState).length !== Object.keys(nextState).length
      ) {
        return true
      }

      for (const key in nextProps) {
        if (!is(thisProps[key], nextProps[key])) {
          return true
        }
      }

      for (const key in nextState) {
        if (
          thisState[key] !== nextState[key] &&
          !is(thisState[key], nextState[key])
        ) {
          return true
        }
      }

      return false
    }

    render() {
      const source = this.props.$list.toJS()
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
            source={source}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.onEndReached}
            onItemPressed={this.onItemPressed}
          />
        </View>
      )
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HOC)
}
