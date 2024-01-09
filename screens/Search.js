import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from "../screens/Navbar";

export default function Search({ navigation }) {

    return (
        <View style={styles.container}>
            <Navbar style={styles.navBar} navigation={navigation} />
            <Text style={styles.text}>La page de recherche</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
    }, 
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})


