import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,  // Marge horizontale pour l'ensemble de la barre
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    navItem: {
        paddingLeft: 25,
        paddingRight: 25,
        
        
    },
    navText: {
        fontSize: 16,
        color: '#ccc',
    },
});

export default function NavBar({ navigation }) {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Details')}>
                <Text style={styles.navText}>Tendances</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Nft')}>
                <Text style={styles.navText}>NFT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.navText}>Recherche</Text>
            </TouchableOpacity>
        </View>
    );
}
