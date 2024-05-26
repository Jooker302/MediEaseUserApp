'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BASE_URL } from '../constants';

type RootStackParamList = {
  ViewReport: { id: string };
};

type ViewReportRouteProp = RouteProp<RootStackParamList, 'ViewReport'>;

interface Record {
  _id: string;
  user_id: string;
  label: string;
  age: number;
  hypertension: number;
  heart_disease: number;
  bmi: number;
  HbA1c_level: number;
  blood_glucose_level: number;
  gender_Female: number;
  gender_Male: number;
  gender_Other: number;
  smoking_history_No_Info: number;
  smoking_history_current: number;
  smoking_history_ever: number;
  smoking_history_former: number;
  smoking_history_never: number;
  smoking_history_not_current: number;
  created_at: string;
}

const SingleReport: React.FC = () => {
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute<ViewReportRouteProp>();
  const { id } = route.params;

//   console.log("", id);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/get-report`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ report_id: id }),
          });
        if (!response.ok) {
          throw new Error('Failed to fetch the record');
        }
        const data = await response.json();
        setRecord(data.data);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load the record. Please try again later.',
        });
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#04b1b2" />
      </View>
    );
  }

  if (!record) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No record found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Label: {record.label}</Text>
          <Text style={styles.label}>Age: {record.age}</Text>
          <Text style={styles.label}>Hypertension: {record.hypertension}</Text>
          <Text style={styles.label}>Heart Disease: {record.heart_disease}</Text>
          <Text style={styles.label}>BMI: {record.bmi}</Text>
          <Text style={styles.label}>HbA1c Level: {record.HbA1c_level}</Text>
          <Text style={styles.label}>Blood Glucose Level: {record.blood_glucose_level}</Text>
          <Text style={styles.label}>Gender: {record.gender_Female ? 'Female' : record.gender_Male ? 'Male' : 'Other'}</Text>
          <Text style={styles.label}>Smoking History: {record.smoking_history_No_Info ? 'No Info' : record.smoking_history_current ? 'Current' : record.smoking_history_ever ? 'Ever' : record.smoking_history_former ? 'Former' : record.smoking_history_never ? 'Never' : 'Not Current'}</Text>
          <Text style={styles.label}>Created At: {new Date(record.created_at).toLocaleString()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#04b1b2',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#04b1b2',
  },
  label: {
    backgroundColor: '#ffffff',
    color: '#04b1b2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04b1b2',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04b1b2',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SingleReport;
