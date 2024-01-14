import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const UserHome = () => {
  const defaultImage = require('../images/default_user_profile.jpg')
  const medicineImage = require('../images/medicine.png')
  const foodImage = require('../images/burger.png')
  const exerciseImage = require('../images/exercise.png')

  return (
    <View style={styles.mainView}>
      <SafeAreaView>
        <ScrollView>
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
    backgroundColor: '#04b1b2',
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
  paddingHorizontal:15,
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
})