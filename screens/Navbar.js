import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

export default function NavBar({ navigation }) {

    const [popUp, setPopUp] = useState(false);
    const [notification, setNotification] = useState([]);

    const togglePopUp = () => {
        setPopUp(!popUp);
    }

    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Details')}>
                <Text style={styles.navText}>Coins</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Nft')}>
                <Text style={styles.navText}>NFT's</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.navText}>Favoris</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={togglePopUp}>
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#ccc"
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={popUp}
                onRequestClose={togglePopUp}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {notification.length === 0 ? (
                            <Text style={styles.modalText}>Aucune notification pour le moment.</Text>
                        ) : (
                            notification.map((notif, index) => (
                                <Text key={index} style={styles.modalText}>{notif}</Text>
                            ))
                        )}
                        <Button title="Fermer" onPress={togglePopUp} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginTop: 50,
    },
    navItem: {
        paddingLeft: 25,
        paddingRight: 25,
    },
    navText: {
        fontSize: 16,
        color: '#ccc',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#333',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        maxWidth: 400,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
    },
});
