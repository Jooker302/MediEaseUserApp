import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';

const ChatScreen = ({ route }: { route: any }) => {
    const { chat } = route.params;
    const [messages, setMessages] = useState<{ id: any; message: string; sender_id: string; created_at: string; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [inputMessage, setInputMessage] = useState('');
    const [userId, setUserId] = useState<string | null>(null);

    const flatListRef = useRef<FlatList>(null);

    interface Message {
        message: string;
        sender_id: string;
        created_at: string;
    }

    const fetchMessages = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            setUserId(storedUserId);

            const api = `${BASE_URL}/api/chat/get-messages`;
            const myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Content-Type', 'application/json');

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    user_id: storedUserId,
                    appointment_id: chat.id,
                }),
            };

            const response = await fetch(api, requestOptions);
            const data = await response.json();
            setMessages(data.data || []);
            setLoading(false);

            // Scroll to the bottom when messages are loaded
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 2000);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [chat.id]);

    const mounted = useRef(true);
    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (mounted.current) {
                // fetchMessages();
            }
        }, 1000); // Fetch messages every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const sendMessage = async () => {
        if (inputMessage.trim() === '' || !userId) {
            return;
        }

        const api = `${BASE_URL}/api/chat/send-message`;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                message: inputMessage,
                sender_id: userId,
                appointment_id: chat.id,
            }),
        };

        try {
            const response = await fetch(api, requestOptions);
            const data = await response.json();

            if (data.message._id) {
                setMessages((prevMessages: { id: any; message: string; sender_id: string; created_at: string; }[]) => [
                    ...prevMessages,
                    {
                        id: data.message._id,
                        message: inputMessage,
                        sender_id: userId,
                        created_at: new Date().toISOString(),
                    }
                ] as { id: any; message: string; sender_id: string; created_at: string; }[]);

                setInputMessage('');

                // Scroll to the bottom when a new message is added
                setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 0);
            } else {
                console.error('Failed to send message:', data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={[styles.messageItem, item.sender_id === userId ? styles.senderColor : styles.receiverColor]}>
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        placeholder="Type a message"
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#04b1b2',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    messageItem: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start', // Default alignment for receiver
    },
    senderColor: {
        backgroundColor: "#b3e7e7",
        alignSelf: 'flex-end', // Align sender messages to the right
    },
    receiverColor: {
        backgroundColor: "#fff",
    },
    messageText: {
        fontSize: 16,
        color: "#000000",
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderRadius: 30,
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 10,
        color: "#000000",
    },
    sendButton: {
        padding: 10,
        backgroundColor: '#04b1b2',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
