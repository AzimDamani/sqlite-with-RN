import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FakeStore from '../screens/FakeStore';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const ToDoIcon = useCallback(() => (
        <Text style={styles.icons}>📝</Text>
    ), []);

    const StoreIcon = useCallback(() => (
        <Text style={styles.icons}>🛒</Text>
    ), []);

    const ToDoTabBar = useCallback(() => (
        <View style={styles.blurContainer}>
            {/* <BlurView
                style={StyleSheet.absoluteFill}
                blurType="light"
                blurAmount={25}
                reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.91)"
            /> */}
        </View>
    ), []);

    const storeTabBar = useCallback(() => (
        <View style={styles.blurContainer}>
            {/* <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.7)"
            /> */}
        </View>
    ), []);
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#e5e5e5',
                tabBarLabelStyle: styles.tabLabel,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'ToDo',
                    tabBarIcon: ToDoIcon,
                    tabBarBackground: ToDoTabBar,
                }}
            />
            <Tab.Screen
                name="FakeStore"
                component={FakeStore}
                options={{
                    title: 'Store',
                    tabBarIcon: StoreIcon,
                    tabBarBackground: storeTabBar,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;

const styles = StyleSheet.create({
    icons: {
        fontSize: 22,
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        borderTopWidth: 0,
        elevation: 5,
        backgroundColor: '#191919',
        // backgroundColor: 'transparent',
        margin: 10,
        borderRadius: 20,
    },
    tabLabel: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    blurContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 20,
        // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    },
});

