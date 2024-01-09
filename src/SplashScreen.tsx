import React from 'react';
import {View, StyleSheet, Text, useColorScheme, Image} from 'react-native';

function SplashScreen(): JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    const logoSource = isDarkMode ? require('./images/logo-black.png') : require('./images/logo-white.png');

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
      flexDirection: 'row', // Arrange items horizontally
    },
    image: {
      width: 120,
      height: 160,
    },
});

export default SplashScreen;
