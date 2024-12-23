import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { addTask } from '../database/database';

const AddTasks = ({navigation}: any) => {
    const [newTask, setNewTask] = useState('');
    const handleAddtask = () => {
        if(newTask.trim() === '') {return;}
        addTask(newTask, () => {
            setNewTask('');
            navigation.goBack();
        });
    };
  return (
    <View>
      <Text>AddTasks</Text>
      <TextInput placeholder="Enter Task title"
      value={newTask}
      onChangeText={setNewTask}/>
      <Button title="Add task" onPress={() => handleAddtask()}/>
    </View>
  );
};

export default AddTasks;
