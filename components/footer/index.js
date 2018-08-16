import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  FooterContainer,
  TitleContainer,
  ButtonTitle
} from './styled'

export class Footer extends Component {
  render () {
    const {
      disable,
      markTask,
      deleteTask,
      openModal
    } = this.props
    return (
      <FooterContainer>
        <TouchableOpacity onPress={openModal}>
          <TitleContainer>
            <ButtonTitle>Add</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={markTask}
          disabled={disable}
        >
          <TitleContainer>
            <ButtonTitle>Done/Undone</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteTask}
          disabled={disable}
        >
          <TitleContainer>
            <ButtonTitle>Delete</ButtonTitle>
          </TitleContainer>
        </TouchableOpacity>
      </FooterContainer>
    )
  }
}
