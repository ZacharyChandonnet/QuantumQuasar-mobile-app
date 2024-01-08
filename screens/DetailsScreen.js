import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';

export default function DetailsScreen({ navigation }) {

    const [isLoading, setLoading] = useState(true);
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
                const result = await response.json();
                const trendingData = result.coins || [];
                setTimeout(() => {
                    setTrendingCoins(trendingData);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error("Error fetching trending coins:", error);
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
            <View style={styles.navBar}>
                <Text style={styles.title}>Tendances</Text>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Nft')}>
                    <Text style={styles.navText}>NFT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Search')}>
                    <Text style={styles.navText}>Recherche</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={trendingCoins}
                keyExtractor={(item) => item.item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Coin', { id: item.item.id })}>
                        <Image
                            style={styles.cryptoImage}
                            source={{ uri: item.item.large }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.cryptoName}>{item.item.name}</Text>
                            <Text style={styles.cryptoSymbol}>{item.item.symbol}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 15,
    },
    cryptoName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cryptoSymbol: {
        color: '#888',
        fontSize: 14,
    },
    isLoading: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 75,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        width: '100%',
    },
    cryptoImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    navItem: {
        padding: 10,
    },
    navText: {
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        color: 'orange',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
