import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.backgroundImage} blurRadius={4}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Text style={styles.text}>Bienvenue sur QuantumQuasar</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
                    <Text style={styles.buttonText}>Détails</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
