import {StyleSheet, Platform, SafeAreaView, Text, FlatList, View, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { CheckBox } from '@rneui/base';

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
  }
})

const myTasks = [
  { key: "1", description: 'Porfolio Submission', completed: false },
  { key: "2", description: 'Do laundry', completed: false },
  { key: "3", description: 'Server Side Final', completed: false },
];

const App = () => {
  const [tasks, setTasks] = useState(myTasks);
   const [newTask, setNewTask] = useState('');

  const renderTask = ({ item }) => {
    return (
      <CheckBox 
        key={item.key}
        title={item.description}
        checked={item.completed}
        onPress={() => {
          const updatedTasks = tasks.map((t) => {
            if (t.key === item.key) {
              return { ...t, completed: !t.completed };
            }
            return t;
          });
          setTasks(updatedTasks);
        }}
        titleProps={{
          style: item.completed
          ? { textDecorationLine: 'line-through'}
          : {}
        }}
      />
    );
  };
    const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [
        ...tasks,
        {
          key: String(Date.now()),
          description: newTask,
          completed: false,
        },
      ];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.h3Container}>Task List</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
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
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView> 
  )
}

export default App;
