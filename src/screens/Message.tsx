import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useState } from 'react';

const Message = () => {
    const defaultImage = require('../images/default_user_profile.jpg');

    const [contacts, setContacts] = useState([
        { id: '1', name: 'John Doe', lastMessage: 'Hello!', time: '12:30 PM' },
        { id: '2', name: 'Jane Smith', lastMessage: 'Hi there!', time: '11:45 AM' },
        { id: '11', name: 'John Doe', lastMessage: 'Hello!', time: '12:30 PM' },
        { id: '21', name: 'Jane Smith', lastMessage: 'Hi there!', time: '11:45 AM' },
        { id: '12', name: 'John Doe', lastMessage: 'Hello!', time: '12:30 PM' },
        { id: '22', name: 'Jane Smith', lastMessage: 'Hi there!', time: '11:45 AM' },
        { id: '13', name: 'John Doe', lastMessage: 'Hello!', time: '12:30 PM' },
        { id: '23', name: 'Jane Smith', lastMessage: 'Hi there!', time: '11:45 AM' },
    ]);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.contactItem}>
            <View style={styles.chatView}>
                <View>
                    <Image
                        source={defaultImage}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.messageView}>
                    <View style={styles.chatHeaderRow}>
                        <Text style={styles.chatHeader}>{item.name}</Text>
                        <Text style={styles.chatTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.chatMessage}>{item.lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.main}>
            {/* <ScrollView> */}
                <View style={styles.container}>

                    <FlatList
                        data={contacts}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        scrollEnabled
                    />
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default Message;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 70,
        backgroundColor: '#04b1b2',
    },
    container: {
        // marginTop: 20,
        backgroundColor: '#04b1b2',
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    chatView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    contactItem: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#04b1b2',
        borderBottomWidth: 1,
        borderBottomColor: '#04b1b2',
        backgroundColor: '#FFFFFF'
    },
    chatHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#04b1b2',
    },
    chatTime: {
        fontSize: 12,
        // fontWeight: 'bold',
        color: '#04b1b2',
        // justifyContent: 'flex-end'
    },
    chatMessage: {
        fontSize: 14,
        color: '#04b1b2',
    },
    messageView: {
        paddingLeft: 10,
    },
    chatHeaderRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
