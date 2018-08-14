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
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{width: '200%'}}
        pagingEnabled
        scrollEnabled={false}
      >
        <TasksList alwaysBounceVertical={false}>
          {this.props.tasks.map((item, index) => {
            if (!item.isDone) {
              return (
                <TouchableOpacity key={index} onPress={() => this.props.openModal('modify', index)}>
                  <TaskItem>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => this.props.checkTask(index)} />
                  </TaskItem>
                </TouchableOpacity>
              )
            }
          })}
        </TasksList>
        <TasksList alwaysBounceVertical={false}>
          {this.props.tasks.map((item, index) => {
            if (item.isDone) {
              return (
                <TouchableOpacity key={index}>
                  <TaskItem>
                    <Text>{item.title}</Text>
                    <CheckBox isChecked={item.isChecked} onClick={() => this.props.checkTask(index)} />
                  </TaskItem>
                </TouchableOpacity>
              )
            }
          })}
        </TasksList>
      </ScrollView>
    )
  }
}
