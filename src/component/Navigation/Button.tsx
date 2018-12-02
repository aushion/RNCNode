import React from 'react'
import { Icon, Avatar } from 'react-native-elements'
interface Props {
  color?: string
  underlayColor?: string
  onPress: () => {}
}

export const Back: React.SFC<Props> = props => {
  return (
    <Icon
      name="arrow-back"
      color={props.color || '#fff'}
      underlayColor={props.color || 'green'}
      onPress={props.onPress}
    />
  )
}

export const Close: React.SFC<Props> = props => {
  return (
    <Icon
      name="close"
      color={props.color || '#fff'}
      underlayColor={props.color || 'green'}
      onPress={props.onPress}
    />
  )
}

export const CustomAvatar: React.SFC<Props> = props => {
  return (
    <Avatar
      small
      rounded
      source={{
        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
      }}
      onPress={props.onPress}
      activeOpacity={0.7}
    />
  )
}
