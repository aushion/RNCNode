import React from 'react'
import { FlatList, View, Text, Dimensions } from 'react-native'
import { ListItem } from './ListItem'
const { width, height } = Dimensions.get('window')
interface Props {
  source: object[]
  refreshing: boolean
  onRefresh: () => {}
  onEndReached: () => {}
  onItemPressed: (content: string, title: string) => {}
}

export class ListContainer extends React.Component<Props, {}> {
  _keyExtractor = (item, index) => item.id
  _renderSeparator = () => {
    return <View style={{ height: 1, backgroundColor: 'lightgray' }} />
  }
  _renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          height,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>加载中</Text>
      </View>
    )
  }

  _footer = () => {
    return this.props.source.length > 0 ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        <Text>加载中...</Text>
      </View>
    ) : null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          data={this.props.source}
          renderItem={({ item }) => (
            <ListItem item={item} onPressed={this.props.onItemPressed} />
          )}
          ItemSeparatorComponent={this._renderSeparator} // 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后
          ListEmptyComponent={this._renderEmpty}
          ListFooterComponent={this._footer}
          refreshing={this.props.refreshing} // 是否刷新 ，自带刷新控件
          onRefresh={() => {
            this.props.onRefresh()
          }}
          onEndReachedThreshold={0.5}
          onEndReached={this.props.onEndReached}
        />
      </View>
    )
  }
}
