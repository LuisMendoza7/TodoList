import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  ButtonContainer,
  ButtonTitle,
  TitleContainer
} from './styled'

export class ScrollViewButtons extends Component {
  render () {
    const {
      scrollToDone,
      scrollToTasks
    } = this.props
    return (
      <ButtonContainer>
        <TouchableOpacity onPress={scrollToTasks}>
          <TitleContainer>
            <ButtonTitle>Tasks</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToDone}>
          <TitleContainer>
            <ButtonTitle>Done</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
      </ButtonContainer>
    )
  }
}
