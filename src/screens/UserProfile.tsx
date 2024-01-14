import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { RadioButton } from 'react-native-paper';

const UserProfile = () => {
    const defaultImage = require('../images/default_user_profile.jpg');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [gender, setGender] = useState('male');

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

    const handleUpdatePress = () => {
        Alert.alert('Update Successful', 'Your profile has been updated successfully.');
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

    return (



        <SafeAreaView style={styles.main}>
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
                                    <RadioButton color='#FFFFFF' uncheckedColor='#FFFFFF' value="male" />
                                
                                    <Text style={styles.radioLabel}>Female</Text>
                                    <RadioButton color='#FFFFFF' uncheckedColor='#FFFFFF' value="female" />
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

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    main: {
        paddingBottom:70, 
        backgroundColor: '#04b1b2'},
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
    }
});

export default UserProfile;