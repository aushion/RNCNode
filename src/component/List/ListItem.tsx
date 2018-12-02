import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Topic } from '../../store/records'

const TopicItem = new Topic()
interface Props {
  item: typeof TopicItem
  onPressed: (content: string, title: string) => {}
}

export const ListItem: React.SFC<Props> = props => {
  const itemData = props.item

  return (
    <TouchableOpacity
      style={styles.commonLine}
      onPress={() => {
        props.onPressed(itemData.content, itemData.title)
      }}
      activeOpacity={0.8}
    >
      <Avatar
        small
        rounded
        source={{
          uri:
            (itemData.author && itemData.author.avatarUrl) ||
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        }}
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
      />
      <View style={styles.content}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          {itemData.title}
        </Text>
        <Text style={{ fontSize: 10 }}>{itemData.author.loginName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  commonLine: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20
  }
})
