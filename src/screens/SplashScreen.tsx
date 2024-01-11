import React, { useEffect } from 'react';
import { View, StyleSheet, Text, useColorScheme, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function SplashScreen(): JSX.Element {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const logoSource = isDarkMode ? require('../images/logo-black.png') : require('../images/logo-white.png');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('RoleSelectScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
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
        <View style={styles.slogonView}>
          <Text style={[isDarkMode ? styles.blackText : styles.whiteText, styles.slogon]}>
            Simplifying Diabetes Management with AI Insights
          </Text>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04b1b2',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  blackText: {
    color: 'black',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  mainArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 120,
    height: 160,
  },
  slogon: {
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  slogonView: {
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default SplashScreen;
