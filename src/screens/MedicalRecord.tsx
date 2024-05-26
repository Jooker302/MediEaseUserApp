'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';
import { useNavigation, NavigationProp  } from '@react-navigation/native';


type RootStackParamList = {
  // RequestDoctor: undefined;
  SingleReport: { id: any };
};

const MedicalRecord = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const img = require('../images/default_user_profile.jpg');
  // Fetch medical records from API
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch(BASE_URL+'/api/user_report/reports/'+userId);
        const data = await response.json();
        // console.log("", data);
        setMedicalRecords(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  // const medicalRecords = [
  //   { id: '1', title: 'Blood Pressure', date: '2022-01-20', image: require('../images/default_user_profile.jpg') },
  //   { id: '2', title: 'X-Ray Report', date: '2022-01-18', image: require('../images/default_user_profile.jpg') },
  //   { id: '3', title: 'Lab Results', date: '2022-01-15', image: require('../images/default_user_profile.jpg') },
  //   { id: '11', title: 'Blood Pressure', date: '2022-01-20', image: require('../images/default_user_profile.jpg') },
  //   { id: '21', title: 'X-Ray Report', date: '2022-01-18', image: require('../images/default_user_profile.jpg') },
  //   { id: '31', title: 'Lab Results', date: '2022-01-15', image: require('../images/default_user_profile.jpg') },
  //   { id: '12', title: 'Blood Pressure', date: '2022-01-20', image: require('../images/default_user_profile.jpg') },
  //   { id: '22', title: 'X-Ray Report', date: '2022-01-18', image: require('../images/default_user_profile.jpg') },
  //   { id: '32', title: 'Lab Results', date: '2022-01-15', image: require('../images/default_user_profile.jpg') },
  //   // Add more medical records as needed
  // ];

  

  const handleRecordPress = (id : any) => {
    // Handle the press event for the medical record item
    navigation.navigate('SingleReport', { id });
    // You can navigate to a detail screen or show a modal with more information here
  };

  const renderItem = ({ item } : { item : any }) => (
    <TouchableOpacity onPress={() => handleRecordPress(item.id)} style={styles.medicalRecordItem}>
      <View style={styles.recordImageContainer}>
        {/* <Image source={item.image} style={styles.recordImage} /> */}
        <Image source={img} style={styles.recordImage} />

      </View>
      <View style={styles.recordDetails}>
        <Text style={styles.recordTitle}>{item.title}</Text>
        <Text style={styles.recordDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
{loading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
        ) : (
      <FlatList
        data={medicalRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled
      />
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#04b1b2', // Set your desired background color
    paddingBottom: 60,
  },
  medicalRecordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set your desired item background color
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  recordImageContainer: {
    marginRight: 15,
  },
  recordImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  recordDetails: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Set your desired text color
  },
  recordDate: {
    fontSize: 14,
    color: '#666666', // Set your desired text color
  },
  loader: {
    marginVertical: 280,
  }
});

export default MedicalRecord;
