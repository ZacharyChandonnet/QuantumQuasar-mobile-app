import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Image } from 'react-native';
import { auth, db } from '../FirebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from "../screens/Navbar";


export default function Search({ navigation }) {
    const [userCoins, setUserCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCoins, setDataCoins] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userId = user.uid;
                const userDocRef = doc(db, 'users', userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const coinsLike = userDocSnapshot.data().CoinsLike || [];
                    setUserCoins(coinsLike);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (loading) {
            return;
        }

        const fetchCoinsData = async () => {
            const promises = userCoins.map(async (coinId) => {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
                const data = await response.json();
                return data;
            });

            const coinsData = await Promise.all(promises);
            setDataCoins(coinsData);
        };

        fetchCoinsData();
    }, [userCoins, loading]);

    return (
        <View style={styles.container}>
            <Navbar style={styles.navBar} navigation={navigation} />
            <Text style={styles.text}>Mes jetons favoris</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={dataCoins}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Coin', { id: item.id })}>
                        <Image
                            style={styles.cryptoImage}
                            source={{ uri: item.image }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                            <Text style={styles.price}>{item.current_price} USD</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
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
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
