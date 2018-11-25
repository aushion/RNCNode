import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'

interface Props {
  item:object
}

export const ListItem: React.SFC<Props> = props => {
  return (
    <View style={styles.commonLine}>
      <Text>123</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  commonLine:{
    height:50,
    backgroundColor: 'lightgreen',
  }
})
