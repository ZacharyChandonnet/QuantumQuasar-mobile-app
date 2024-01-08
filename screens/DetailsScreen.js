import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function DetailsScreen() {

    let [isLoading, setLoading] = useState(true);
    let [error, setError] = useState();
    let [resultat, setResultat] = useState();

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/list")
            .then(res => res.json())
            .then(resultat => {
                setResultat(resultat);
                setLoading(false);
            },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            )
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }
    if (error) {
        return <Text>Erreur : {error.message}</Text>;
    }
    console.log(resultat)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Les cryptos</Text>
            <Text style={styles.text}>Nom de la monaie : {resultat[366].name}</Text>
        </View>
    )
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
    isLoading: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
