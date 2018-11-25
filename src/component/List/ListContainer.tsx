import React,{Component} from 'react'
import {FlatList} from 'react-native'
import {ListItem} from './ListItem';

interface Props {
  source:object [],
  refresh:boolean
}

export class ListContainer extends React.Component<Props, {}> {

  render() {
    return (
      <FlatList
        data={this.props.source}
        renderItem={({item}) => <ListItem item={item}/>}
        refreshing={this.props.refresh} // 是否刷新 ，自带刷新控件
        onRefresh={()=>{
          // this.refresh();
        }}>
      </FlatList>
    )
  }
}
