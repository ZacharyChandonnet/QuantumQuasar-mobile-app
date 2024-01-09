import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

export default function NavBar({ navigation }) {

    const [popUp, setPopUp] = useState(false);

    const togglePopUp = () => {
        setPopUp(!popUp);
    }
    
    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Details')}>
                <Text style={styles.navText}>Tendances</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Nft')}>
                <Text style={styles.navText}>NFT</Text>
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
                        <Text style={styles.modalText}>Voici votre pop-up de notifications!</Text>
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
        backgroundColor: 'white',
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
