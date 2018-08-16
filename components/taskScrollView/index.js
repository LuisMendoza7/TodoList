import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-check-box'
import {
  TasksList,
  TaskItem
} from './styled'

export class TaskScrollView extends Component {
  render () {
    const {
      tasks,
      openModal,
      checkTask
    } = this.props
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{width: '200%'}}
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => { this.scrollViewRef = ref }}
      >
        <TasksList alwaysBounceVertical={false}>
          {tasks.map((item, index) => {
            if (!item.isDone) {
              return (
                <TouchableOpacity key={index} onPress={() => openModal('modify', index)}>
                  <TaskItem>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => checkTask(index)} />
                  </TaskItem>
                </TouchableOpacity>
              )
            }
          })}
        </TasksList>
        <TasksList alwaysBounceVertical={false}>
          {tasks.map((item, index) => {
            if (item.isDone) {
              return (
                <TouchableOpacity key={index}>
                  <TaskItem>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => checkTask(index)} />
                  </TaskItem>
                </TouchableOpacity>
              )
            }
          })}
        </TasksList>
      </ScrollView>
    )
  }
  scrollToDone () {
    this.scrollViewRef.scrollToEnd()
  }
  scrollToTasks () {
    this.scrollViewRef.scrollTo({x: 0, y: 0, animated: true})
  }
}
