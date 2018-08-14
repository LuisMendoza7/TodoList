import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Button
} from 'react-native'
import {
  KeyboardView,
  ModalContainer,
  ModalView,
  Title,
  Padding,
  Label,
  TitleInput,
  DescriptionInput,
  Footer
} from './styled'

export class TaskModal extends Component {
  render () {
    return (
      <View>
        <Modal
          animationType='fade'
          transparent
          visible={this.props.isVisible}
        >
          <KeyboardView behavior='padding'>
            <ModalContainer>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
                <ModalView>
                  <Title>{this.props.title}</Title>
                  <Padding>
                    <Label>Title:</Label>
                    <TitleInput
                      maxLength={25}
                      returnKeyType='next'
                      blurOnSubmit={false}
                      value={this.props.titleValue}
                      onChangeText={title => this.props.onChange('title', title)}
                      onSubmitEditing={() => { this.descriptionInput.root.focus() }}
                    />
                    <Label>Description:</Label>
                    <DescriptionInput
                      multiline
                      value={this.props.descriptionValue}
                      onChangeText={description => this.props.onChange('description', description)}
                      ref={(input) => { this.descriptionInput = input }}
                    />
                  </Padding>
                  <Footer>
                    <Button color='black' title='Close' onPress={this.props.onClose} />
                    <Button color='black' title={this.props.buttonTitle} onPress={this.props.addTask} />
                  </Footer>
                </ModalView>
              </TouchableWithoutFeedback>
            </ModalContainer>
          </KeyboardView>
        </Modal>
      </View>
    )
  }
}
