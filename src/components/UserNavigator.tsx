import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHome from '../screens/UserHome';
import UserProfile from '../screens/UserProfile';
import Message from '../screens/Message';
import MedicalRecord from '../screens/MedicalRecord';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const UserNavigator = () => {

  const navigation = useNavigation();

  const tabBarIcon = ({ focused, size, route }: { focused: boolean; size: number; route: any }) => {
    let iconName: string = '';
    let iconColor: string = focused ? '#04b1b2' : 'gray';
  
    const iconSize: number = size;
    iconColor = focused ? '#04b1b2' : 'gray';
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person-circle' : 'person-circle-outline';
    } else if (route.name === 'Message') {
      iconName = focused ? 'chatbubble' : 'chatbubble-outline';
    } else if (route.name === 'Medical Record') {
      iconName = focused ? 'document-lock' : 'document-lock-outline';
    }
  
    return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
  };
  

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => tabBarIcon({ focused, size, route }),
      tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        backgroundColor: 'white',
        height: 70,
      },
      tabBarLabelStyle: {},
      tabBarActiveTintColor: '#04b1b2',
      tabBarInactiveTintColor: 'gray',
    })}
    >

      <Tab.Screen
        name="Home"
        component={UserHome}
        options={{ 
          headerStyle: {
            backgroundColor: '#04b1b2', 
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Home', 
        
        }} 
      />
      <Tab.Screen
        name="Medical Record"
        component={MedicalRecord}
        options={{ 
          headerStyle: {
            backgroundColor: 'white', 
          },
          headerTintColor: '#04b1b2', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Records', 
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate('AddRecord' as never);
              }}
            >
              <Ionicons name="add" size={30} color="#04b1b2" />
            </TouchableOpacity>
          ),
        }} 
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{ 
          headerStyle: {
            backgroundColor: '#04b1b2', 
          },
          headerTintColor: 'white', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Messages', 
        
        }} 
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{ headerShown: false }} 
      />
      
    </Tab.Navigator>
  );
};

export default UserNavigator;
