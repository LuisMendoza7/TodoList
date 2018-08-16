import React, { Component } from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import { MessageBar, showMessage } from 'react-native-messages'
import styled from './node_modules/styled-components'
import { styles } from './styles'
import { TaskModal } from './components/taskModal'
import { TaskScrollView } from './components/taskScrollView'

const NavBar = styled.View` 
  background-color: #75a7f9
  flex-direction: row
  height: 40
  justify-content: space-evenly
`

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
    this.onChange = this.onChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.onClose = this.onClose.bind(this)
    this.addTask = this.addTask.bind(this)
    this.checkTask = this.checkTask.bind(this)
    this.handleScrollToDone = this.handleScrollToDone.bind(this)
    this.handleScrollToTasks = this.handleScrollToTasks.bind(this)
  }
  render () {
    return (
      <View style={styles.body}>
        <View style={styles.box}>
          <Text style={styles.title}>To-Do List</Text>
        </View>
        <NavBar>
          <Button color='white' title='Tasks' onPress={this.handleScrollToTasks} />
          <Button color='white' title='Done' onPress={this.handleScrollToDone} />
        </NavBar>
        <TaskScrollView
          tasks={this.state.tasks}
          checkTask={this.checkTask}
          openModal={this.openModal}
          ref='TaskScrollView'
        />
        <TaskModal
          isVisible={this.state.isOpen}
          onChange={this.onChange}
          addTask={this.addTask}
          onClose={this.onClose}
          buttonTitle={this.state.isModify ? 'Modify' : 'Add'}
          title={this.state.isModify ? this.state.taskTemplate.title : 'Add Task'}
          titleValue={this.state.taskTemplate.title || null}
          descriptionValue={this.state.taskTemplate.description || ''}
        />
        <View style={styles.footer}>
          <Button title='Add' color='white' onPress={this.openModal} />
          <Button disabled={this.state.tasks.length === 0} title='Done/Undone' color='white' onPress={() => { this.markTask() }} />
          <Button disabled={this.state.tasks.length === 0} title='Delete' color='white' onPress={() => { this.deleteTask() }} />
        </View>
        <MessageBar />
      </View>
    )
  }
  handleScrollToDone () {
    this.refs.TaskScrollView.scrollToDone()
  }
  handleScrollToTasks () {
    this.refs.TaskScrollView.scrollToTasks()
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
    this.setState({taskTemplate})
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
}
