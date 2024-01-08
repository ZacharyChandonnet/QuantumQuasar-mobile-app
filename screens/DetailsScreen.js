import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';

export default function DetailsScreen() {

    const [isLoading, setLoading] = useState(true);
    const [resultat, setResultat] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams({
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
        });
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                setTimeout(() => {
                    setResultat(result);
                    setLoading(false);
                }, 500);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tendances</Text>
            <FlatList
                data={resultat}
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
