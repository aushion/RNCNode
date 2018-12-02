import { Header } from 'react-native-elements'
import React from 'react'
import { Back, Close } from './Button'

interface Props {
  backgroundColor?: string
  color?: string
  title?: string
  leftComponent?: any
  rightComponent?: any
  navigation: any
  close?: boolean
  onRightPress?: () => {}
}

export const CommonHeader: React.SFC<Props> = props => {
  return (
    <Header
      backgroundColor="green"
      innerContainerStyles={{ alignItems: 'center', height: 50 }}
      outerContainerStyles={{ paddingBottom: 0, paddingTop: 20 }}
      leftComponent={
        props.leftComponent ? (
          props.leftComponent
        ) : props.close ? (
          <Close onPress={() => props.navigation.goBack()} />
        ) : (
          <Back onPress={() => props.navigation.goBack()} />
        )
      }
      centerComponent={{
        text:
          props.title.length > 21
            ? props.title.substring(0, 20) + '...'
            : props.title,
        style: { color: '#fff' }
      }}
      rightComponent={props.rightComponent}
    />
  )
}
