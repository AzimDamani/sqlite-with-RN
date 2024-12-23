import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { deleteTask, editTaskDetails, updateTask } from '../database/database';
import { DB } from './HomeScreen';

const TaskDetailsScreen = ({route, navigation}: any) => {
    const [data, setData] = useState<DB>({});
    const [editedTitle, setEditedTitle] = useState('');
    useEffect(() => {
        console.log(route.params.taskDetails);
        setData(route.params.taskDetails);
        setEditedTitle(route.params.taskDetails.title);
    }, [route.params]);

    const changeStatus = () => {
        const status = data?.completed;
        if(status === 0){
            updateTask(data?.id , 1, () => {});
            setData((prev) => ({...prev, completed : 1}));
        }
        else {
            updateTask(data.id , 0, () => {});
            setData((prev) => ({...prev, completed : 0}));
        }
    };

    const handleDeleteTask = () => {
        deleteTask(data.id, () => {});
        navigation.goBack();
    };
    const handleEditedText = (id: number, title: string) => {
        editTaskDetails(id, title);
        navigation.goBack();
    };
  return (
    <View style={styles.container}>
      <TextInput value={editedTitle} onChangeText={setEditedTitle} style={styles.inpFeild}/>
      <TouchableOpacity onPress={() => changeStatus()} style={[styles.status ,data.completed === 0 ? styles.incomp : styles.complete]}>
        <Text style={styles.btnTxt}>{data.completed === 0 ? 'Incomplete' : 'Complete'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask()} style={styles.deleteBtn}>
        <Text style={styles.btnTxt}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.status} onPress={() => handleEditedText(data.id, editedTitle)}>
        <Text style={styles.btnTxt}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetailsScreen;


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#000000',
        padding:5,
    },
    txt:{
        color:'white',
        fontWeight: 200,
    },
    btnTxt: {
        textAlign: 'center',
        fontWeight: 200,
        fontSize: 30,
        color: 'white',
    },
    inpFeild: {
        backgroundColor: 'gray',
        padding: 20,
        color: 'white',
        fontSize: 20,
        borderRadius: 20,
    },
    deleteBtn: {
        backgroundColor: 'red',
        padding: 20,
        textAlign: 'center',
        borderRadius: 20,
        margin: 20,
    },
    status: {
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'gray',
        padding: 20,
        margin: 20,
    },
    complete: {
        borderColor: 'green',
    },
    incomp: {
        borderColor: 'red',
    },
});

