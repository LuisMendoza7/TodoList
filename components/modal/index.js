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
} from './styled.js'

export class TaskModal extends Component {
  render () {
    return (
      <View>
        <Modal
          animationType='fade'
          transparent
          visible>
          <KeyboardView behavior='padding'>
            <ModalContainer>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
                <ModalView>
                  <Title>Add Task</Title>
                  <Padding>
                    <Label>Title:</Label>
                    <TitleInput
                      maxLength={25}
                      returnKeyType='next'
                      blurOnSubmit={false}
                    />
                    <Label>Description:</Label>
                    <DescriptionInput multiline />
                  </Padding>
                  <Footer>
                    <Button color='black' title='Close' />
                    <Button color='black' title='Add' />
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
