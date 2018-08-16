import React, { Component } from 'react'
import {
  HeaderContainer,
  Title
} from './styled'

export class Header extends Component {
  render () {
    return (
      <HeaderContainer>
        <Title>To-Do List</Title>
      </HeaderContainer>
    )
  }
}
