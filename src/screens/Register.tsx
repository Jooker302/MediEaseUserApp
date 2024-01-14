import { StyleSheet, Text, View, useColorScheme, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const logoSource = isDarkMode ? require('../images/logo-black.png') : require('../images/logo-white.png');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (inputText: any) => {
    setEmail(inputText);
  };

  const handlePasswordChange = (inputText: any) => {
    setPassword(inputText);
  };

  const handleNameChange = (inputText: any) => {
    setName(inputText);
  };

  const handleConfirmPasswordChange = (inputText: any) => {
    setConfirmPassword(inputText);
  };

  const handleRegisterPress = () => {
    navigation.navigate('UserNavigator' as never);
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
});


export default Register;