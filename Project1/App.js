import {StyleSheet, Platform, SafeAreaView, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { CheckBox } from '@rneui/base'
import { SwipeListView } from 'react-native-swipe-list-view' //new import

// Option 1: Add two new components

// link to repo

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBC3E3",
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: "center"
  },
  h3Container: {
    fontWeight: "bold",
    fontSize: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  inputBox: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    },
  addButton: {
    backgroundColor: '#7159c1',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // New styles added below
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    width: 60,
    height: '50%',
    margin: 20
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
  }
})

// Original code
const myTasks = [
  { key: "1", description: 'Porfolio Submission', completed: false },
  { key: "2", description: 'Do laundry', completed: false },
  { key: "3", description: 'Server Side Final', completed: false },
]
// Original code
const App = () => {
   const [tasks, setTasks] = useState(myTasks)
   const [newTask, setNewTask] = useState('')
   const [title, setTitle] = useState('Task List')

  const renderTask = ({ item }) => {
    return (
      <CheckBox 
        key={item.key}
        title={item.description}
        checked={item.completed}
        onPress={() => {
          const updatedTasks = tasks.map((t) => {
            if (t.key === item.key) {
              return { ...t, completed: !t.completed }
            }
            return t
          })
          setTasks(updatedTasks)
        }}
        titleProps={{
          style: item.completed
          ? { textDecorationLine: 'line-through'}
          : {}
        }}
      />
    )
  }
 
  // Original code 
    const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [
        ...tasks,
        {
          key: String(Date.now()),
          description: newTask,
          completed: false,
        },
      ]
      setTasks(updatedTasks)
      setNewTask('')
    }
  }
  
// 1 New component for a delete task action. 
// Uses state 'tasks'
// Uses parameter 'key'
  const handleDeleteTask = (key) => {
    const updatedTasks = tasks.filter((t) => t.key !== key)
    setTasks(updatedTasks)
  }

// 2 New component for user input. Changing the title using state and props.
// Uses states 'editing' and 'newTitle'
// Uses parameters 'title' and 'setTitle'
  const TitleChanger = ({ title, setTitle }) => {
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
// User input handlers
    const handleTitlePress = () => {
      setEditing(true)
      setNewTitle(title)
    }
    const handleTitleChange = (value) => {
      setNewTitle(value)
    }
    const handleTitleSubmit = () => {
      setTitle(newTitle)
      setEditing(false)
    }
  if (editing) {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter new title"
          value={newTitle}
          onChangeText={handleTitleChange}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleTitleSubmit}
        >
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <TouchableOpacity onPress={handleTitlePress}>
        <Text h3 style={styles.h3Container}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

  return (
    // Implemented handleDeleteTask inside the SwipeListView
    // Implemented setTitle inside TitleChanger
    <SafeAreaView style={styles.container}>
      <TitleChanger title={title} setTitle={setTitle} />
      <SwipeListView
        data={tasks}
        renderItem={renderTask}
        renderHiddenItem={({ item }) => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.key)}>
      <Text style={styles.deleteButtonText}>delete</Text>
      </TouchableOpacity>
      )}
        leftOpenValue={100}
        rightOpenValue={-200}
        keyExtractor={(item) => item.key.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Add new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  )
} 

export default App