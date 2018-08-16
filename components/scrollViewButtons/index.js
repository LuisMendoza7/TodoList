import React, { Component } from 'react'
import { Button } from 'react-native'
import { ButtonContainer } from './styled'

export class ScrollViewButtons extends Component {
  render () {
    return (
      <ButtonContainer>
        <Button
          color='white'
          title='Tasks'
          onPress={this.props.scrollToTasks}
        />
        <Button
          color='white'
          title='Done'
          onPress={this.props.scrollToDone}
        />
      </ButtonContainer>
    )
  }
}
