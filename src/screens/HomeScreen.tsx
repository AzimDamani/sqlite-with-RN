import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getTasks, initializeDatabase } from '../database/database';
import { useFocusEffect } from '@react-navigation/native';


export type DB = {
    id: number,
    title: string,
    completed: number,
}

const HomeScreen = ({ navigation }: any) => {
    const [tasks, setTasks] = useState<DB[]>([]);
    const fetchTasks = useCallback(() => {
        getTasks((data: DB[]) => setTasks(data));
        console.log(tasks);
    }, [tasks]);

    useEffect(() => {
        initializeDatabase();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, []));

    const goToAddPage = () => {
        navigation.navigate('AddTasks');
    };

    const gotToDetails = (taskDetails: DB) => {
        navigation.navigate('TaskDetailsScreen', { taskDetails });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.hero}>To Do App</Text>
            <TouchableOpacity style={styles.addTaskBtn} onPress={() => goToAddPage()}>
                <Text style={styles.btn}>+</Text>
            </TouchableOpacity>
            <View style={styles.listContainer}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: DB }) => (
                    <TouchableOpacity onPress={() => gotToDetails(item)} style={[styles.taskcard , item.completed === 0 ? styles.taskIncomplete : styles.taskComplete]}>
                        <Text style={styles.itemTxt}>{item.title}</Text>
                        <Text style={styles.itemTxt}>{item.completed === 0 ? '✏️' : '✅'}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.innerList}
            />
            </View>
        </View>
    );
};

export default HomeScreen;


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
    hero:{
        color: 'white',
        fontSize: 40,
        fontWeight: 700,
    },
    btn:{
        color:'white',
        fontSize: 50,
    },
    addTaskBtn: {
        position: 'absolute',
        top: '80%',
        left: '55%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: '#7c92ff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        zIndex: 3,
        display: 'flex',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    },
    taskcard:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'gray',
        padding:20,
        borderRadius:20,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-evenly',
    },
    taskComplete: {
        backgroundColor: '#4666ff',
    },
    taskIncomplete: {
        backgroundColor : '#d5dcff',
    },
    listContainer: {
        flex: 1,
        marginTop: 20,
    },
    itemTxt: {
        color: 'white',
        fontSize: 30,
        fontWeight: 200,
    },
    innerList:{
        paddingBottom: 100,
    },
});


