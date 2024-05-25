'use client';

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';
import { ActivityIndicator } from 'react-native';



const RequestDoctor = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [message, setMessage] = useState('');

    const handleRequestPress = async () => {
        // Handle data submission here
        setLoading(true);
        const user_id = await AsyncStorage.getItem('userId');
        const requestData = {
            user_id: user_id,
            message: message,
        };

        fetch(BASE_URL + '/api/chat/make-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    // If response is not ok, handle the error
                    setLoading(false);

                    return response.json().then(data => {

                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: data.message,
                        });
                    });
                }

                return response.json();
            })
            .then(data => {
                setLoading(false);

                if (data && data.success === false) {

                } else {
                    setLoading(false);

                    navigation.navigate('UserNavigator' as never);
                    // Replace 'AnotherPage' with the name of your target page
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: 'Request sent successfully',
                    });
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to add report. Please try again later.',
                });
            });


    };

    return (
        <SafeAreaView style={styles.maincontainer}>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Message"
                            placeholderTextColor="#999"
                            value={message}
                            onChangeText={setMessage}
                        />

                        <TouchableOpacity onPress={handleRequestPress} style={styles.predictButton}>
                            <Text style={styles.predictButtonText}>Request Dcotor</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#04b1b2', // Set your desired background color
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#04b1b2', // Set your desired background color
        paddingBottom: 60,
    },
    input: {
        backgroundColor: '#ffffff',
        color: '#04b1b2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        height: 150,

    },
    predictButton: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    predictButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default RequestDoctor;
