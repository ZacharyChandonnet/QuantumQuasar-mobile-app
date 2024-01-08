import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Nft({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>La page des NFT's</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
    }, 
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})


