import React, { Component } from 'react'
import { Button } from 'react-native'
import { FooterContainer } from './styled'

export class Footer extends Component {
  render () {
    return (
      <FooterContainer>
        <Button
          title='Add'
          color='white'
          onPress={this.props.openModal}
        />
        <Button
          disabled={this.props.tasks.length === 0}
          title='Done/Undone'
          color='white'
          onPress={() => { this.props.markTask() }}
        />
        <Button
          disabled={this.props.tasks.length === 0}
          title='Delete'
          color='white'
          onPress={() => { this.props.deleteTask() }}
        />
      </FooterContainer>
    )
  }
}
