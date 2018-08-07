import React, { Component } from 'react'
import { View, Text, ScrollView, Button, Modal, TextInput, TouchableOpacity } from 'react-native'
import CheckBox from 'react-native-check-box'
import { styles } from './styles'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.scrollHorizontalRef
    this.titleInput
    this.descriptionInput
    this.addTaskModal
    this.modifyTaskModal
    this.modifyTitleInput
    this.modifyDescriptionInput
    this.state = {
      tasks: [],
      addTaskModalVisible: false,
      modifyTaskModalVisible: false,
      isChecked: false,
      titleHolder: '',
      descriptionHolder: '',
      modifyTitleHolder: '',
      modifyDescriptionHolder: '',
      indexHolder: ''
    }
    this.scrollToDone = this.scrollToDone.bind(this)
    this.scrollToTasks = this.scrollToTasks.bind(this)
    this.modifyModal = this.modifyModal.bind(this)
  }
  scrollToDone() {
    this.scrollHorizontalRef.scrollToEnd()
  }
  scrollToTasks() {
    this.scrollHorizontalRef.scrollTo({x:0, y:0, animated: true})
  }
  addTask(visible) {
    let newTask = {
      title: this.state.titleHolder,
      description: this.state.descriptionHolder,
      isChecked: false,
      isDone: false
    }
    let addedTasks = this.state.tasks
    addedTasks.push(newTask)
    this.setState({addTaskModalVisible: visible, tasks: addedTasks, titleHolder: '', descriptionHolder: ''})
  }
  markTask() {
    let markedTasks = this.state.tasks
    markedTasks.map((item) => {if (item.isChecked) {
        item.isDone = !item.isDone
        item.isChecked = false
      }
    })
    this.setState({tasks: markedTasks})
  }
  checkTask(index) {
    console.log(index)
    let checkedTasks = this.state.tasks
    checkedTasks[index].isChecked = !checkedTasks[index].isChecked
    this.setState({tasks: checkedTasks})
  }
  deleteTask() {
    let deletedTasks = this.state.tasks.filter((item) => !item.isChecked)
    this.setState({tasks: deletedTasks})
  }
  modifyTask() {
    let modifiedTask = this.state.tasks
    modifiedTask[this.state.indexHolder].title = this.state.modifyTitleHolder || modifiedTask[this.state.indexHolder].title
    modifiedTask[this.state.indexHolder].description = this.state.modifyDescriptionHolder || modifiedTask[this.state.indexHolder].description
    this.setState({modifyDescriptionHolder: '', modifyTitleHolder: '', tasks: modifiedTask})
  }
  modifyModal() {
    if(this.state.tasks.length > 0 && this.state.indexHolder !== '') {
      return (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{this.state.tasks[this.state.indexHolder].title}</Text>
          <View>
            <Text style={styles.inputTitle}>Task Title:</Text>
            <TextInput
              value={this.state.tasks[this.state.indexHolder].title}
              style={styles.simpleInput}
              maxLength={30}
              returnKeyType='next'
              onSubmitEditing={() => {this.modifyDescriptionInput.focus()}}
              onChangeText={(modifyTitleHolder) => {this.setState({modifyTitleHolder})}}
              blurOnSubmit={false}
              ref={(ref) => {this.modifyTitleInput=ref}}
            />
            <Text style={styles.inputTitle}>Task Description:</Text>
            <TextInput
              value={this.state.tasks[this.state.indexHolder].description}
              style={styles.bigInput}
              onChangeText={(modifyDescriptionHolder) => {this.setState({modifyDescriptionHolder})}}
              multiline={true}
              ref={(ref) => {this.modifyDescriptionInput=ref}}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button color='black' title='Close' onPress={() => this.setState({modifyTaskModalVisible: false})}/>
            <Button color='black' title='Modify' onPress={() => this.modifyTask()}/>
          </View>
        </View>
      )
    }
  }
	render() {
		return (
			<View style={styles.body}>
				<View style={styles.box}>
					<Text style={styles.title}>To-Do List</Text>
				</View>
		{/* NavBar */}
				<View style={styles.tabs}>
					<Button color='white' title='Tasks' onPress={this.scrollToTasks}/>
					<Button color='white' title='Done' onPress={this.scrollToDone}/>
			</View>
		{/* NavBarEnd */}
				<ScrollView 
            horizontal 
            contentContainerStyle={{width: '200%'}} 
            pagingEnabled
            scrollEnabled={false}
            ref={(ref) => {this.scrollHorizontalRef=ref}}
        >
					<ScrollView style={styles.container}>
          {this.state.tasks.map((item, index) => {
            if(!item.isDone) {
              return (
                <TouchableOpacity onPress={() => this.setState({indexHolder: index, modifyTaskModalVisible: true})}>
                  <View style={styles.item}>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => this.checkTask(index)}/>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
					</ScrollView>
					<ScrollView style={styles.container}>
          {this.state.tasks.map((item, index) => {
            if(item.isDone) {
              return (
                <View style={styles.item}>
                  <Text>{item.title}</Text>
                  <CheckBox isChecked={item.isChecked} onClick={() => this.checkTask(index)}/>
                </View>
              )
            }
          })}
					</ScrollView>
				</ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addTaskModalVisible}
          ref={(ref) => {this.addTaskModal=ref}}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add a New Task</Text>
            <View>
              <Text style={styles.inputTitle}>Task Title:</Text>
              <TextInput 
                style={styles.simpleInput}
                maxLength={25}
                returnKeyType='next'
                onSubmitEditing={() => {this.descriptionInput.focus()}}
                onChangeText={(titleHolder) => {this.setState({titleHolder})}}
                blurOnSubmit={false}
                ref={(ref) => {this.titleInput=ref}}
              />
              <Text style={styles.inputTitle}>Task Description:</Text>
              <TextInput
                style={styles.bigInput}
                multiline={true}
                onChangeText={(descriptionHolder) => {this.setState({descriptionHolder})}}
                ref={(ref) => {this.descriptionInput=ref}}
              />
            </View>
            <View style={styles.modalFooter}>
              <Button color='black' title='Close' onPress={() => this.setState({addTaskModalVisible: false})}/>
              <Button color='black' title='Add' onPress={() => {this.addTask(!this.state.addTaskModalVisible) }}/>
            </View>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.modifyTaskModalVisible}
          ref={(ref) => {this.modifyTaskModal=ref}}
          >
          {this.modifyModal()}
        </Modal>
			{/* Footer */}
				<View style={styles.footer}>
					<Button title='Add' color='white' onPress={() => this.setState({addTaskModalVisible: true})}/>
					<Button title='Done/Undone' color='white' onPress={() => {this.markTask()}}/>
					<Button title='Delete' color='white' onPress={() => {this.deleteTask()}}/>
				</View>
			{/* Footer End */}
			</View>
		)
	}
}