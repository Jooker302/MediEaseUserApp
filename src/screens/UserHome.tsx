import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

const UserHome = () => {
  const medicineImage = require('../images/medicine.png')
  const foodImage = require('../images/burger.png')
  const exerciseImage = require('../images/exercise.png')

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
    <View style={styles.mainView}>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.homeTitle}>EXPLORE</Text>
          <View>
            <TouchableOpacity style={[styles.homeBox, styles.homeYellow]}>
              <Image
                source={medicineImage}
                style={styles.profileImage}
              />
              <Text style={styles.homeBoxText}>Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.homeBox, styles.homeGreen]}>
              <Image
                source={foodImage}
                style={styles.profileImage}
              />
              <Text style={styles.homeBoxText}>Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.homeBox, styles.homeRed]}>
              <Image
                source={exerciseImage}
                style={styles.profileImage}
              />
              <Text style={styles.homeBoxText}>Exercise</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  homeBox: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 20,

  },
  homeGreen: {
    backgroundColor: '#C1F2B0',
  },
  homeRed: {
    backgroundColor: '#FF004D',
  },
  homeYellow: {
    backgroundColor: '#FAEF5D',
  },
  homeBoxText: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#000000'
  },
  homeTitle: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 10,
  }
})