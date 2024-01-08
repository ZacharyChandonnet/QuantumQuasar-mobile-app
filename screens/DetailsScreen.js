import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

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
            <Text style={styles.title}>Tendances</Text>
            <FlatList
                data={cryptoList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            style={styles.cryptoImage}
                            source={{ uri: item.image }}
                        />
                        <Text style={styles.text}>{item.name} ({item.symbol})</Text>
                    </View>
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
    },
    cryptoImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 60,
    },
});
