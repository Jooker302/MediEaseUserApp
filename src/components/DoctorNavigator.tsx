import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserHome from '../screens/UserHome';
import UserProfile from '../screens/UserProfile';
import DoctorMessage from '../screens/DoctorMessage';
import UserPredication from '../screens/UserPredication';
import MedicalRecord from '../screens/MedicalRecord';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const DoctorNavigator = () => {


  const tabBarIcon = ({ focused, size, route }: { focused: boolean; size: number; route: any }) => {
    let iconName: string = '';
    let iconColor: string = focused ? '#04b1b2' : 'gray';
  
    const iconSize: number = size;
    iconColor = focused ? '#04b1b2' : 'gray';
    if (route.name === 'Profile') {
      iconName = focused ? 'person-circle' : 'person-circle-outline';
    } else if (route.name === 'DoctorMessage') {
      iconName = focused ? 'chatbubble' : 'chatbubble-outline';
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

      {/* <Tab.Screen
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
      /> */}
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="DoctorMessage"
        component={DoctorMessage}
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

export default DoctorNavigator;
