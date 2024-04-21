import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper';
import { BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const UserProfile = () => {
    const defaultImage = require('../images/default_user_profile.jpg');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [gender, setGender] = useState('Male');
    const [loading, setLoading] = useState(true);

    const handleEmailChange = (inputText: any) => {
        setEmail(inputText);
    };

    const handlePasswordChange = (inputText: any) => {
        setPassword(inputText);
    };

    const handleNameChange = (inputText: any) => {
        setName(inputText);
    };

    const handleAgeChange = (inputText: any) => {
        setAge(inputText);
    };
    const convertImageToBase64 = async (imageUri: any) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                resolve(base64String);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    const handleUpdatePress = async () => {
        try {
            // Compress the image before sending
            setLoading(true);

            // Prepare data to send in the API call
            var base64Image;
            // console.log(profileImage)
            if (profileImage != null) {
                base64Image = await convertImageToBase64(profileImage);
            } else {
                base64Image = '';
            }
            // console.log(base64Image)

            // Prepare request data
            const requestData = {
                name,
                email,
                age,
                password,
                gender,
                profileImage: base64Image, // Include profile image as base64 string
            };

            // Send API call to update profile
            const userId = await AsyncStorage.getItem('userId');
            var link = BASE_URL + '/api/update-profile/' + userId;
            console.log("", link);
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // const data = await response.json();

            // Handle success or error response from API
            setLoading(false);

            if (response.ok) {
                // Alert.alert('Update Successful', 'Your profile has been updated successfully.');
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Your profile has been updated successfully.',
                  });
            } else {
                // Alert.alert('Update Failed', 'Failed to update profile. Please try again later.');
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to update profile. Please try again later.',
                  });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error updating profile',
              });
            // Alert.alert('Update Failed', 'An error occurred while updating your profile. Please try again later.');
        }
    };

    const handleImagePress = () => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo'
        }, (response: any) => {
            if (!response.didCancel && !response.error) {
                const selectedAssets = response.assets;
                if (selectedAssets && selectedAssets.length > 0) {
                    const newImageUri = selectedAssets[0].uri;
                    setProfileImage(newImageUri);
                }
            }
        });
    }

    const handleGenderChange = (value: string) => {
        setGender(value);
    };

    useEffect(() => {
        // Fetch user profile data from API
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL to fetch user profile data
            const userId = await AsyncStorage.getItem('userId');
            const response = await fetch(BASE_URL + '/api/profile/' + userId);
            const data = await response.json();

            // Update state variables with API response data
            setName(data.data.name);
            setEmail(data.data.email);
            setAge(data.data.age);
            setGender(data.data.gender);
            setProfileImage(data.data.image)
            setLoading(false);
            // You can also set other state variables as needed
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Handle error
        }
    };

    return (



        <SafeAreaView style={styles.main}>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={[styles.headerView]}>
                            <Text style={[styles.loginHeading, styles.whiteText]}>User Profile</Text>
                        </View>
                        <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <Image source={defaultImage} style={styles.profileImage} />
                            )}
                        </TouchableOpacity>
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
                                <Text style={[styles.whiteText, styles.inputLabel]}>Age</Text>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder=""
                                    onChangeText={handleAgeChange}
                                    value={age}
                                    keyboardType="numeric"
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
                                <Text style={[styles.whiteText, styles.inputLabel]}>Gender</Text>
                                <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
                                    <View style={styles.radioContainer}>
                                        <Text style={styles.radioLabel}>Male</Text>
                                        <RadioButton color='#FFFFFF' uncheckedColor='#FFFFFF' value="Male" />

                                        <Text style={styles.radioLabel}>Female</Text>
                                        <RadioButton color='#FFFFFF' uncheckedColor='#FFFFFF' value="Female" />
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <View style={styles.buttonView}>
                                <CustomButton
                                    title="Update"
                                    onPress={handleUpdatePress}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            )}
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    main: {
        paddingBottom: 70,
        backgroundColor: '#04b1b2'
    },
    container: {
        marginTop: 20,
        backgroundColor: '#04b1b2',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerView: {
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
    whiteText: {
        color: '#FFFFFF',
    },
    blackText: {
        color: 'black',
    },
    inputView: {

    },
    buttonView: {
        paddingTop: 20,
    },
    imageContainer: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 100, // Adjust this value for a perfect circle
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    addImageText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center'
    },
    radioLabel: {
        fontWeight: '600',
        marginRight: 10,
        color: '#FFFFFF',
    },
    radioButton: {
        color: '#FFFFFF',
    },
    loader: {
        marginVertical: 280,
    },
});

export default UserProfile;