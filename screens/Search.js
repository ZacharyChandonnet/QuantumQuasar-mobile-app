import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../FirebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from "../screens/Navbar";

export default function Search({ navigation }) {
    const [userCoins, setUserCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataCoins, setDataCoins] = useState([]);
    const [dataNfts, setDataNfts] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userId = user.uid;
                const userDocRef = doc(db, 'users', userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const coinsLike = userDocSnapshot.data().CoinsLike || [];
                    setUserCoins(coinsLike);
                    const nftsLike = userDocSnapshot.data().NftLike || [];
                    setDataNfts(nftsLike);
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
            <ScrollView>
                {dataCoins.map((item, index) => (
                    <TouchableOpacity style={styles.coinItem} key={index}>
                        <Image source={{ uri: item.image?.small }} style={{ width: 30, height: 30 }} />
                        <Text style={styles.coinSymbol}>{item.symbol?.toUpperCase()}</Text>
                        <Text style={styles.coinName}>{item.name}</Text>
                        <Text style={styles.coinPrice}>${item.market_data?.current_price?.usd?.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.centeredTextContainer}>
                    <Text style={styles.text}>Mes NFT's favoris</Text>
                </View>
                {dataNfts.map((item, index) => (
                    <TouchableOpacity style={styles.coinItem} key={index}>
                        <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
                        <Text style={styles.coinSymbol}>{item.symbol?.toUpperCase()}</Text>
                        <Text style={styles.coinName}>{item.name}</Text>
                        <Text style={styles.coinPrice}>${item.price.toFixed(2)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    coinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        width: '100%',
    },
    coinSymbol: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    coinName: {
        color: '#ddd',
        fontSize: 16,
        marginLeft: 10,
    },
    coinPrice: {
        color: '#34c759',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    centeredTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
});
