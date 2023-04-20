import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

const DeletionComponent = ({ tasks }) => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleSelectTask = (taskId) => {
    // Check if the task is already selected
    const isSelected = selectedTasks.includes(taskId);

    // Update the selectedTasks state based on whether the task is selected or not
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteSelected = () => {
    // Remove the selected tasks from the tasks array
    const updatedTasks = tasks.filter((task) => !selectedTasks.includes(task.id));
    // Update the tasks state with the updatedTasks
    setTasks(updatedTasks);
    // Clear the selectedTasks state
    setSelectedTasks([]);
  };

  const renderItem = ({ item }) => {
    // Check if the task is selected
    const isSelected = selectedTasks.includes(item.id);

    return (
      <View>
        <TouchableOpacity onPress={() => handleSelectTask(item.id)}>
          <Text style={{ color: isSelected ? 'red' : 'black' }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={handleDeleteSelected}>
        <Text>Delete Selected</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeletionComponent;
