import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native-web';

export default function Nft({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [Nft, setNft] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/nfts/list')
                const resultat = await response.json();
                if (Array.isArray(resultat)) {
                    const randomNfts = resultat.sort(() => 0.5 - Math.random()).slice(0, 20);
                    setNft(randomNfts);
                    console.log(randomNfts);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                } else {
                    console.error("API response is not an array:", resultat);
                }
            } catch (error) {
                console.error("Error fetching NFT:", error);
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
                data={Nft}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('Details', { id: item.id })}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
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
    isLoading: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        width: '100%',
    },
    cryptoImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        marginTop: 5,
    },
    price: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
})


