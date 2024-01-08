import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Les cryptos</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
