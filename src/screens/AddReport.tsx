'use client';

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, Alert  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';
import CustomButton from '../components/CustomButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator } from 'react-native';

const AddReport = () => {
  const navigation = useNavigation();
  const [label, setLabel] = useState('');
  const [age, setAge] = useState('');
  const [hypertension, setHypertension] = useState('');
  const [heartDisease, setHeartDisease] = useState('');
  const [bmi, setBMI] = useState('');
  const [hba1cLevel, setHbA1cLevel] = useState('');
  const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState('');
  const [gender, setGender] = useState('gender_Female');
  const [smokingHistory, setSmokingHistory] = useState('smoking_history_No_Info');
  const [loading, setLoading] = useState(false);

  enum MediaType {
    Photo = 'photo',
    Video = 'video',
    Mixed = 'mixed',
  }

  const handleImagePickerResponse = async (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('ImagePicker Error: ', response.errorMessage);
    } else {
      const base64Image = response.assets[0].base64;
      const imageData = `data:image/jpeg;base64,${base64Image}`;

      // console.log("test: ", imageData);
      const user_id = await AsyncStorage.getItem('userId');
      const data = {
        user_id: user_id,
        image: imageData
      };

      
      setLoading(true);
      fetch(BASE_URL + '/api/get-report-image', {
       method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
      setLoading(false);

          // Alert.alert('Error', 'Failed to process image');
        } else {
      setLoading(false);

          populateFields(data.data);
          // Alert.alert('Success', 'Image uploaded successfully');
        }
      })
      .catch((error) => {
      setLoading(false);

        console.error('Error uploading image: ', error);
        Alert.alert('Error', 'Failed to upload image');
      });
    }
  };

  const populateFields = (parsedData: any) => {
    setAge(parsedData.age || '');
    setHypertension(parsedData.hypertension || '');
    setHeartDisease(parsedData.heartDisease || '');
    setBMI(parsedData.bmi || '');
    setHbA1cLevel(parsedData.hba1cLevel || '');
    setBloodGlucoseLevel(parsedData.bloodGlucoseLevel || '');
    setGender(parsedData.gender || 'gender_Female');
    setSmokingHistory(parsedData.smokingHistory || 'smoking_history_No_Info');
  };

  const selectImage = () => {
    const options = {
      mediaType: MediaType.Photo,
      includeBase64: true,
    };
    launchImageLibrary(options, handleImagePickerResponse);
  };

  const handleAddPress = async () => {
    // Handle data submission here
    const user_id = await AsyncStorage.getItem('userId');
    const requestData = {
      user_id: user_id,
      label: label,
      age: parseInt(age),
      hypertension: parseInt(hypertension),
      heart_disease: parseInt(heartDisease),
      bmi: parseFloat(bmi),
      HbA1c_level: parseFloat(hba1cLevel),
      blood_glucose_level: parseInt(bloodGlucoseLevel),
      gender_Female: gender === 'gender_Female' ? 1 : 0,
      gender_Male: gender === 'gender_Male' ? 1 : 0,
      gender_Other: gender === 'gender_Other' ? 1 : 0,
      smoking_history_No_Info: smokingHistory === 'smoking_history_No_Info' ? 1 : 0,
      smoking_history_current: smokingHistory === 'smoking_history_current' ? 1 : 0,
      smoking_history_ever: smokingHistory === 'smoking_history_ever' ? 1 : 0,
      smoking_history_former: smokingHistory === 'smoking_history_former' ? 1 : 0,
      smoking_history_never: smokingHistory === 'smoking_history_never' ? 1 : 0,
      smoking_history_not_current: smokingHistory === 'smoking_history_not_current' ? 1 : 0,
    };

    fetch(BASE_URL + '/api/user_report/user_add_report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          // If response is not ok, handle the error
          return response.json().then(data => {

            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: data.message,
            });
          });
        }

        return response.json();
      })
      .then(data => {

        if (data && data.success === false) {

        } else {
          navigation.navigate('UserNavigator' as never);
          // Replace 'AnotherPage' with the name of your target page
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Report added successfully',
          });
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add report. Please try again later.',
        });
      });


  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
      ) : (
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton title="Upload Report" onPress={selectImage} ></CustomButton>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Label"
            placeholderTextColor="#999"
            value={label}
            onChangeText={setLabel}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Hypertension (0 or 1)"
            value={hypertension}
            placeholderTextColor="#999"

            onChangeText={setHypertension}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Heart Disease (0 or 1)"
            value={heartDisease}
            onChangeText={setHeartDisease}
            keyboardType="numeric"
            placeholderTextColor="#999"

          />
          <TextInput
            style={styles.input}
            placeholder="BMI"
            value={bmi}
            placeholderTextColor="#999"

            onChangeText={setBMI}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="HbA1c Level"
            value={hba1cLevel}
            placeholderTextColor="#999"

            onChangeText={setHbA1cLevel}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Blood Glucose Level"
            value={bloodGlucoseLevel}
            placeholderTextColor="#999"
            onChangeText={setBloodGlucoseLevel}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={(itemValue: string) => setGender(itemValue)}
          >
            <Picker.Item label="Female" value="gender_Female" />
            <Picker.Item label="Male" value="gender_Male" />
            <Picker.Item label="Other" value="gender_Other" />
          </Picker>
          <Picker
            selectedValue={smokingHistory}
            style={styles.input}
            onValueChange={(itemValue: string) => setSmokingHistory(itemValue)}
          >
            <Picker.Item label="No Info" value="smoking_history_No_Info" />
            <Picker.Item label="Current" value="smoking_history_current" />
            <Picker.Item label="Ever" value="smoking_history_ever" />
            <Picker.Item label="Former" value="smoking_history_former" />
            <Picker.Item label="Never" value="smoking_history_never" />
            <Picker.Item label="Not Current" value="smoking_history_not_current" />
          </Picker>
          <TouchableOpacity onPress={handleAddPress} style={styles.predictButton}>
            <Text style={styles.predictButtonText}>Add Report</Text>
          </TouchableOpacity>
        </View>
             )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#04b1b2',
  },
  loader: {
    marginVertical: 280,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#04b1b2', // Set your desired background color
    paddingBottom: 60,
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#04b1b2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,

  },
  predictButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  predictButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default AddReport;
