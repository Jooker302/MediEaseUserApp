import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const UserPrediction = () => {
  const [prediction, setPrediction] = useState('');

  const handlePredictPress = () => {
    // You can replace this with your prediction logic
    setPrediction('Today is a great day!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePredictPress} style={styles.predictButton}>
        <Text style={styles.predictButtonText}>Predict</Text>
      </TouchableOpacity>
      {prediction ? (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>{prediction}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#04b1b2', // Set your desired background color
    paddingBottom: 60,
  },
  predictButton: {
    backgroundColor: '#ffffff', // Set your desired button background color
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  predictButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Set your desired text color
  },
  predictionContainer: {
    backgroundColor: '#ffffff', // Set your desired background color
    borderRadius: 10,
    padding: 15,
  },
  predictionText: {
    fontSize: 16,
    color: '#333333', // Set your desired text color
  },
});

export default UserPrediction;
