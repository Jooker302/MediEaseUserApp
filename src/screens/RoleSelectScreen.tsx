import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useColorScheme, BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';


const RoleSelectScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const logoSource = isDarkMode ? require('../images/logo-black.png') : require('../images/logo-white.png');

  const handleUserPress = () => {
    // console.log('User');
    navigation.navigate('UserLogin');
  };

  const handleDoctorPress = () => {
    // console.log('Doctor');
    navigation.navigate('DoctorLogin');
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
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

        <View style={styles.buttonView}>
          <Text style={[styles.whiteText, styles.continue]}>Continue As</Text>
          <CustomButton
            title="User"
            onPress={handleUserPress}
          />
          <CustomButton
            title="Doctor"
            onPress={handleDoctorPress}
          />
        </View>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04b1b2',
    padding: 30,
    paddingTop: 60,
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
  continue: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  buttonView: {
    paddingTop: 60,
  },
  button: {
    backgroundColor: '#FFFFFF',
    color: '#04b1b2',
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#04b1b2',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default RoleSelectScreen;
