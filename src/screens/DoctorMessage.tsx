import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    RequestDoctor: undefined;
    ChatScreen: { chat: any };
};

const DoctorMessage = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const defaultImage = require('../images/default_user_profile.jpg');
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                console.log(userId);
                const api = BASE_URL + '/api/chat/doctor-apis/get-appointments';
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        doctor_id: userId,
                    }),
                };

                const response = await fetch(api, requestOptions);
                const data = await response.json();
                if (data.message === 'No appointments found') {
                    setChats([]);
                } else {
                    setChats(data.data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chats:', error);
                setLoading(false);
            }
        };

        fetchChats();
    }, []);

    const handleChatPress = (chat: any) => {
        navigation.navigate('ChatScreen', { chat });
    };

    const renderItem = ({ item }: { item: any }) => {
        const userImage = item.user_image 
            ? { uri: `${item.user_image}` }
            : defaultImage;

        return (
            <TouchableOpacity style={styles.contactItem} onPress={() => handleChatPress(item)}>
                <View style={styles.chatView}>
                    <Image
                        source={userImage}
                        style={styles.profileImage}
                    />
                    <View style={styles.messageView}>
                        <View style={styles.chatHeaderRow}>
                            <Text style={styles.chatHeader}>{item.user_name}</Text>
                            <Text style={styles.chatTime}>{item.created_at}</Text>
                        </View>
                        <Text style={styles.chatMessage}>{item.lastMessage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
                ) : (
                    chats.length > 0 ? (
                        <FlatList
                            data={chats}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            scrollEnabled
                        />
                    ) : (
                        <View style={styles.noChats}>
                            <Text style={styles.noChatsText}>No Patients assigned</Text>
                        </View>
                    )
                )}
            </View>
        </SafeAreaView>
    );
};

export default DoctorMessage;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 70,
        backgroundColor: '#04b1b2',
    },
    container: {
        backgroundColor: '#04b1b2',
        flex: 1,
    },
    header: {
        backgroundColor: '#04b1b2',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    chatView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#04b1b2',
    },
    contactItem: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#04b1b2',
    },
    chatTime: {
        fontSize: 12,
        color: '#A9A9A9',
    },
    chatMessage: {
        fontSize: 14,
        color: '#04b1b2',
    },
    messageView: {
        paddingLeft: 10,
        flex: 1,
    },
    chatHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    noChats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChatsText: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});
