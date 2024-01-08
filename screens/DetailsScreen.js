import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

export default function DetailsScreen() {

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cryptoList, setCryptoList] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams({
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
        });
    
        fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(result => {
            setCryptoList(result);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setError(error);
        });
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }

    if (error) {
        return <Text>Erreur : {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Les 20 cryptos les plus populaires :</Text>
            <FlatList
                data={cryptoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.text}>{item.name}</Text>
                )}
            />
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
    isLoading: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
