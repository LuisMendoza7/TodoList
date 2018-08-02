import React, { Component } from 'react'
import { View, Text, ScrollView, Button, Modal, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native'
import CheckBox from 'react-native-check-box'
import { styles } from './styles'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.scrollHorizontalRef
    this.titleInput
    this.descriptionInput
    this.state = {
      addTaskModalVisible: false,
      isChecked: false
    }
    this.scrollToDone = this.scrollToDone.bind(this)
    this.scrollToTasks = this.scrollToTasks.bind(this)
  }
	setAddTaskModalVisible(visible) {
		this.setState({addTaskModalVisible: visible})
	}
  scrollToDone() {
    this.scrollHorizontalRef.scrollToEnd()
  }
  scrollToTasks() {
    this.scrollHorizontalRef.scrollTo({x:0, y:0, animated: true})
  }
  changeCheckBox() {
    this.setState({isChecked: !this.state.isChecked})
  }
  addTask(visible) {
    this.setState({addTaskModalVisible: visible})
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
            <View style={styles.item}>
  						<Text>Test Text</Text>
              <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
            </View>
            <View style={styles.item}>
              <Text>Item 2</Text>
              <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
            </View>
            <View style={styles.item}>
              <Text>Item 3</Text>
              <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
            </View>
            <View style={styles.item}>
              <Text>Item 4</Text>
              <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
            </View>
            <View style={styles.item}>
              <Text>Item 5</Text>
              <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
            </View>
					</ScrollView>
					<ScrollView style={styles.container}>
          <View style={styles.item}>
            <Text>Done 1</Text>
            <CheckBox onClick={() => { this.changeCheckBox()}} isChecked={this.state.isChecked}/>
          </View>
          <View style={styles.item}>
            <Text>Done 2</Text>
          </View>
          <View style={styles.item}>
            <Text>Done 3</Text>
          </View>
          <View style={styles.item}>
            <Text>Done 4</Text>
          </View>
          <View style={styles.item}>
            <Text>Done 5</Text>
          </View>
					</ScrollView>
				</ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addTaskModalVisible}
          >
          <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add a New Task</Text>
          <View>
            <Text style={styles.inputTitle}>Task Title:</Text>
            <TextInput 
              style={styles.simpleInput}
              maxLength={30}
              returnKeyType='next'
              onSubmitEditing={() => {this.descriptionInput.focus()}}
              blurOnSubmit={false}
              ref={(ref) => {this.titleInput=ref}}
            />
            <Text style={styles.inputTitle}>Task Description:</Text>
            <TextInput
              style={styles.bigInput}
              multiline={true}
              ref={(ref) => {this.descriptionInput=ref}}
            />
          </View>
          <View>
            
          </View>
          <View style={styles.modalFooter}>
            <Button color='black' title='Close' onPress={() => { this.setAddTaskModalVisible(!this.state.addTaskModalVisible) }}/>
            <Button color='black' title='Add New Task' onPress={() => { this.addTask(!this.state.addTaskModalVisible) }}/>
          </View>
          </View>
        </Modal>
			{/* Footer */}
				<View style={styles.footer}>
					<Button title='Add' color='white' onPress={() => { this.setAddTaskModalVisible(true)}}/>
					<Button title='Mark' color='white'/>
					<Button title='Delete' color='white'/>
				</View>
			{/* Footer End */}
			</View>
		)
	}
}