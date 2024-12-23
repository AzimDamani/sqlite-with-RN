import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import AddTasks from '../screens/AddTasks';
import TabNavigation from './TabNavigation';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigation" screenOptions={{
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} options={{
          title: 'Details',
        }} />
        <Stack.Screen name="AddTasks" component={AddTasks} options={{
          title: 'Add New Task',
        }} />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};


export default AppNavigation;
