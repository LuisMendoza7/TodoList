import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform
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
  Footer,
  TitleContainer,
  ButtonTitle
} from './styled'

export class TaskModal extends Component {
  render () {
    const {
      isVisible,
      title,
      titleValue,
      descriptionValue,
      onClose,
      addTask,
      buttonTitle,
      onChange
    } = this.props
    return (
      <View>
        <Modal
          animationType='fade'
          transparent
          visible={isVisible}
        >
          <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ModalContainer>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
                <ModalView>
                  <Title>{title}</Title>
                  <Padding>
                    <Label>Title:</Label>
                    <TitleInput
                      maxLength={25}
                      returnKeyType='next'
                      blurOnSubmit={false}
                      value={titleValue}
                      onChangeText={title => onChange('title', title)}
                      onSubmitEditing={() => { this.descriptionInput.root.focus() }}
                    />
                    <Label>Description:</Label>
                    <DescriptionInput
                      textAlignVertical='top'
                      multiline
                      value={descriptionValue}
                      onChangeText={description => onChange('description', description)}
                      ref={(input) => { this.descriptionInput = input }}
                    />
                  </Padding>
                  <Footer>
                    <TouchableOpacity onPress={onClose}>
                      <TitleContainer>
                        <ButtonTitle>Close</ButtonTitle>
                      </TitleContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addTask}>
                      <TitleContainer>
                        <ButtonTitle>{buttonTitle}</ButtonTitle>
                      </TitleContainer>
                    </TouchableOpacity>
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
