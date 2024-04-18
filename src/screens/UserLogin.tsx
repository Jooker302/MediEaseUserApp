import { StyleSheet, Text, View, useColorScheme, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';

// import { AsyncStorage } from 'react-native';

const UserLogin = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const logoSource = isDarkMode ? require('../images/logo-black.png') : require('../images/logo-white.png');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (inputText: any) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputText: any) => {
    setPassword(inputText);
  };

  const handleLoginPress = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");



    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        email,
        password,
      }),
    };

    try {
      // const response = await fetch("https://mediease.vercel.app/api/auth/login", requestOptions);
      // const response = await fetch(process.env.API_URL+":3000/api/auth/login", requestOptions);
      var api =  BASE_URL + '/api/auth/login';
      console.log("", api);
      const response = await fetch(api, requestOptions);


      const result = await response.json();
  
      if (response.ok) {
        await AsyncStorage.setItem('userId', result.user._id);
        // console.log(result.user._id); 
        // Alert.alert('Success', result.message);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: result.message,
        });
 
        navigation.navigate('UserNavigator' as never);
      } else {
        // Alert.alert('Success', result.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.message,
        });
        console.log(result.message); 
      }
    } catch (error) {
      // Alert.alert('Success', error.);
      console.log('Error during registration:', error);
    }finally {
      setLoading(false); // Set loading back to false after request completes
    }
    // navigation.navigate('UserNavigator' as never);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register' as never);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
        ) : (
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
              <Text style={[styles.whiteText, styles.inputLabel]}>Email</Text>
              <TextInput
                style={[styles.input]}
                placeholder="email@mail.com"
                onChangeText={handleEmailChange}
                value={email}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.whiteText, styles.inputLabel]}>Password</Text>
              <TextInput
                style={[styles.input]}
                placeholder="*********"
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.buttonView}>
              <CustomButton
                title="Login"
                onPress={handleLoginPress}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleRegisterPress}>
              <Text style={styles.register}>Register Now</Text>
            </TouchableOpacity>

          </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04b1b2',
    padding: 30,
    paddingTop: 55,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 100,
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
  loader: {
    marginVertical: 280,
  }
});


export default UserLogin;