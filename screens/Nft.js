import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import NftsData from '../Nfts.json';
import NavBar from './Navbar';

export default function Nft({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [randomNfts, setRandomNfts] = useState([]);

    useEffect(() => {
        const shuffledNfts = [...NftsData].sort(() => Math.random() - 0.5);
        setRandomNfts(shuffledNfts);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }
    return (
        <View style={styles.container}>
            <NavBar style={styles.navBar} navigation={navigation} />
            <FlatList
                data={randomNfts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => navigation.navigate('NftDetails', { id: item.id })}
                    >
                        <Image
                            source={{ uri: item.image.small }}
                            style={styles.cryptoImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                            <Text style={styles.cryptoSymbol}>{item.symbol.toUpperCase()}</Text>
                            <Text style={styles.price}>{item.floor_price.usd} USD</Text>
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
    searchBarContainer: {
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#555',
    },
});
