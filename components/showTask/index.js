import React, { Component } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import {
  Title,
  Description,
  TitleContainer,
  ButtonTitle
} from './styled'

export class ShowTask extends Component {
  render () {
    const { onClose } = this.props
    return (
      <View>
        <Title>Hello</Title>
        <Description>This is a long description. This is a long description. This is a long description. This is a long description.This is a long description. This is a long description. </Description>
        <TouchableOpacity onPress={onClose}>
          <TitleContainer>
            <ButtonTitle>Close</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
      </View>
    )
  }
}
