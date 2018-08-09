import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { MessageBar, showMessage } from 'react-native-messages'
import { styles } from './styles'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      isOpen: false,
      addTaskModalVisible: false,
      modifyTaskModalVisible: false,
      taskTemplate: {
        title: '',
        description: '',
        isChecked: false,
        isDone: false
      },
      indexHolder: '',
      isModify: false
    }
    this.scrollToDone = this.scrollToDone.bind(this)
    this.scrollToTasks = this.scrollToTasks.bind(this)
    this.onChange = this.onChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  scrollToDone () {
    this.scrollHorizontalRef.scrollToEnd()
  }
  scrollToTasks () {
    this.scrollHorizontalRef.scrollTo({x: 0, y: 0, animated: true})
  }
  addTask () {
    if (this.state.isModify) {
      showMessage('Task Modified')
      const { taskTemplate, tasks, indexHolder } = this.state
      tasks[indexHolder] = taskTemplate
      this.setState({isOpen: false, isModify: false, indexHolder: '', taskTemplate: { title: '', description: '', isChecked: false, isDone: false }})
    } else {
      showMessage('Task Added')
      const { taskTemplate, tasks } = this.state
      tasks.push(taskTemplate)
      this.setState({isOpen: false, tasks, taskTemplate: { title: '', description: '', isChecked: false, isDone: false }})
    }
  }
  onChange (name, value) {
    const { taskTemplate } = this.state
    taskTemplate[name] = value
  }
  markTask () {
    showMessage('Moved')
    let { tasks } = this.state
    tasks.map((item) => {
      if (item.isChecked) {
        item.isDone = !item.isDone
        item.isChecked = false
      }
    })
    this.setState({tasks})
  }
  checkTask (index) {
    let { tasks } = this.state
    tasks[index].isChecked = !tasks[index].isChecked
    this.setState({tasks})
  }
  deleteTask () {
    showMessage('Deleted')
    let deletedTasks = this.state.tasks.filter((item) => !item.isChecked)
    this.setState({tasks: deletedTasks})
    // let { tasks } = this.state
    // tasks = tasks.filter(item => !item.isChecked)
    // this.setState({tasks})
  }
  openModal (type, index) {
    let { tasks, taskTemplate } = this.state
    let copyTasks = JSON.parse(JSON.stringify(tasks))
    if (type === 'modify') {
      taskTemplate = copyTasks[index]
      this.setState({taskTemplate, isOpen: true, isModify: true, indexHolder: index})
    } else {
      this.setState({isOpen: true, taskTemplate: { title: '', description: '', isChecked: false, isDone: false }})
    }
  }
  onClose () {
    this.setState({isOpen: false, isModify: false, taskTemplate: { title: '', description: '', isChecked: false, isDone: false }})
  }
  render () {
    return (
      <View style={styles.body}>
        <View style={styles.box}>
          <Text style={styles.title}>To-Do List</Text>
        </View>
        <View style={styles.tabs}>
          <Button color='white' title='Tasks' onPress={this.scrollToTasks} />
          <Button color='white' title='Done' onPress={this.scrollToDone} />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{width: '200%'}}
          pagingEnabled
          scrollEnabled={false}
          ref={(ref) => { this.scrollHorizontalRef = ref }}
        >
          <ScrollView style={styles.container} alwaysBounceVertical={false}>
            {this.state.tasks.map((item, index) => {
              if (!item.isDone) {
                return (
                  <TouchableOpacity key={index} onPress={() => this.openModal('modify', index)}>
                    <View style={styles.item}>
                      <Text>{item.title}</Text>
                      <CheckBox isChecked={item.isChecked} onClick={() => this.checkTask(index)} />
                    </View>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
          <ScrollView style={styles.container} alwaysBounceVertical={false}>
            {this.state.tasks.map((item, index) => {
              if (item.isDone) {
                return (
                  <View key={index} style={styles.item}>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => this.checkTask(index)} />
                  </View>
                )
              }
            })}
          </ScrollView>
        </ScrollView>
        <Modal
          animationType='fade'
          transparent
          visible={this.state.isOpen}
          ref={(ref) => { this.addTaskModal = ref }}
        >
          <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>{this.state.isModify ? this.state.taskTemplate.title : 'Add a New Task'}</Text>
                  <View style={{paddingTop: 15, paddingBottom: 15}}>
                    <Text style={styles.inputTitle}>Task Title:</Text>
                    <TextInput
                      style={styles.simpleInput}
                      maxLength={25}
                      returnKeyType='next'
                      value={this.state.taskTemplate.title || ''}
                      onSubmitEditing={() => { this.descriptionInput.focus() }}
                      onChangeText={title => this.onChange('title', title)}
                      blurOnSubmit={false}
                      ref={(ref) => { this.titleInput = ref }}
                    />
                    <Text style={styles.inputTitle}>Task Description:</Text>
                    <TextInput
                      style={styles.bigInput}
                      multiline
                      value={this.state.taskTemplate.description || ''}
                      onChangeText={description => this.onChange('description', description)}
                      ref={(ref) => { this.descriptionInput = ref }}
                    />
                  </View>
                  <View style={styles.modalFooter}>
                    <Button color='black' title='Close' onPress={this.onClose} />
                    <Button color='black' title={this.state.isModify ? 'Modify' : 'Add'} onPress={() => this.addTask()} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.footer}>
          <Button title='Add' color='white' onPress={this.openModal} />
          <Button disabled={this.state.tasks.length === 0} title='Done/Undone' color='white' onPress={() => { this.markTask() }} />
          <Button disabled={this.state.tasks.length === 0} title='Delete' color='white' onPress={() => { this.deleteTask() }} />
        </View>
        <MessageBar />
      </View>
    )
  }
}
