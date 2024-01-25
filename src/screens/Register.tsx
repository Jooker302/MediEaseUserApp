import { StyleSheet, Text, View, useColorScheme, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import RadioButton from 'react-native-paper/lib/typescript/components/RadioButton/RadioButton';
import { RadioButton } from 'react-native-paper';
import { Alert } from 'react-native';



const Register = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const logoSource = isDarkMode ? require('../images/logo-black.png') : require('../images/logo-white.png');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');

  const handleEmailChange = (inputText: any) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputText: any) => {
    setPassword(inputText);
  };

  const handleGenderChange = (selectedGender: any) => {
    setGender(selectedGender);
  };

  const handleNameChange = (inputText: any) => {
    setName(inputText);
  };

  const handleAgeChange = (inputText: any) => {
    setAge(inputText);
  };

  const handleConfirmPasswordChange = (inputText: any) => {
    setConfirmPassword(inputText);
  };

  const handleRegisterPress = async () => {
    // navigation.navigate('UserNavigator' as never);
    // console.log("")
    // console.log('Name:', name);
    // console.log('Password:', password);
    // console.log('Email:', email);
    // console.log('Age:', age);
    // console.log('Confirm Password:', confirmPassword);
    // console.log('Gender:', gender);

    if (!name) {
      console.log('Please enter your name.');
      Alert.alert('Error', 'Please enter your name.');
      return;
    }

    if (!email) {
      console.log('Please enter your email.');
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // console.log('Invalid email format.');
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    if (!password) {
      // console.log('Please enter a password.');
      Alert.alert('Error', 'Please enter a password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      // console.log('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      // console.log('Passwords do not match.');
      return;
    }

    if (!age) {
      // console.log('Please enter your age.');
      Alert.alert('Error', 'Please enter your age.');

      return;
    }

    // Age should be a positive number
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      // console.log('Please enter a valid age.');
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        name,
        email,
        age,
        gender,
        role: "Patient",
        password,
        image: ""
      }),
    };

    try {
      const response = await fetch("https://mediease.vercel.app/api/auth/register", requestOptions);
      const result = await response.json();
  
      if (response.ok) {
        console.log(result.message); 
        Alert.alert('Success', result.message);
        navigation.navigate('UserLogin' as never);
      } else {
        Alert.alert('Success', result.message);
        console.log(result.message); 
      }
    } catch (error) {
      // Alert.alert('Success', error.);
      console.log('Error during registration:', error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('UserLogin' as never);
  }


  return (

    <SafeAreaView >
      <ScrollView >
        <View style={[styles.main, styles.container]}>
          <Image
            source={logoSource}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={[isDarkMode ? styles.whiteText : styles.blackText, styles.heading]}>
              MEDI
            </Text>
            <Text style={[isDarkMode ? styles.blackText : styles.whiteText, styles.heading]}>
              EASE
            </Text>
          </View>
          <View style={[styles.loginView]}>
            <Text style={[styles.loginHeading, styles.whiteText]}>User Login</Text>
          </View>
          <View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Name</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                onChangeText={handleNameChange}
                value={name}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Email</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                onChangeText={handleEmailChange}
                value={email}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Age</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                onChangeText={handleAgeChange}
                value={age}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Password</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Confirm Password</Text>
              <TextInput
                style={[styles.input]}
                placeholder=""
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Gender</Text>
              <View style={styles.radioView}>
                <RadioButton
                  value="male"
                  status={gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => handleGenderChange('Male')}
                  color="#FFFFFF"
                  uncheckedColor='#FFFFFF'
                />
                <Text style={styles.whiteText}>Male</Text>
                <RadioButton
                  value="female"
                  status={gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => handleGenderChange('Female')}
                  color='#FFFFFF' uncheckedColor='#FFFFFF'
                />
                <Text style={styles.whiteText}>Female</Text>
              </View>
            </View>
            <View style={styles.buttonView}>
              <CustomButton
                title="Register"
                onPress={handleRegisterPress}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.register}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04b1b2',
    padding: 30,
    // paddingTop: 60,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 160,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  blackText: {
    color: 'black',
  },
  textContainer: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  loginView: {
    paddingVertical: 10,
  },
  loginHeading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    width: 250,
    borderRadius: 20,
    color: '#04b1b2',
  },
  inputLabel: {
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: '900',
    // marginHorizontal: 10,
    marginVertical: 10,
  },
  inputView: {
    // paddingTop: 10,
  },
  buttonView: {
    paddingTop: 20,
  },
  register: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Register;