'use client';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';
import { Picker } from '@react-native-picker/picker';

const UserExercise = () => {
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(true);
  const [userRecordId, setUserRecordId] = useState("");
  const [userRecordIds, setUserRecordIds] = useState<any[]>([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch(BASE_URL+'/api/user_report/reports/'+userId);
        const data = await response.json();
        setUserRecordIds(data.data);
        setLoading(false);

        // Set userRecordId to the first element in userRecordIds
        if (data.data.length > 0) {
          setUserRecordId(data.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const handlePredictPress = () => {
    setLoading(true);
    console.log(userRecordId);
    const requestData = {
      userRecordId: userRecordId,
    };

    fetch(BASE_URL+'/api/exercise_check_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data => {
      setPrediction(data.prediction);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching prediction:', error);
      setLoading(false);
    })
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
      ) : (
        <View style={styles.container}>
          {userRecordIds.length > 0 ? (
            <React.Fragment>
              <Picker
                selectedValue={userRecordId}
                style={styles.input}
                onValueChange={(itemValue: string) => setUserRecordId(itemValue)}
              >
                {userRecordIds.map((item, index) => (
                  <Picker.Item key={index} label={item.title} value={item.id} />
                ))}
              </Picker>

              <TouchableOpacity onPress={handlePredictPress} style={styles.predictButton}>
                <Text style={styles.predictButtonText}>Predict</Text>
              </TouchableOpacity>
              {prediction ? (
                <View style={styles.predictionContainer}>
                  <Text style={styles.predictionText}>{prediction}</Text>
                </View>
              ) : null}
            </React.Fragment>
          ) : (
            <Text style={styles.noRecordsText}>No medical records found. Please add records.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#04b1b2',
    paddingBottom: 60,
  },
  predictButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  predictButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  predictionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
  },
  predictionText: {
    fontSize: 16,
    color: '#333333',
  },
  loader: {
    marginVertical: 280,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#04b1b2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  noRecordsText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default UserExercise;
