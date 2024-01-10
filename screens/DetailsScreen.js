import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Navbar from '../screens/Navbar';
import FavoriteCoin from '../screens/FavoriteCoin';


export default function DetailsScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [isFavorite, setFavorite] = useState(false);

 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
                const result = await response.json();
                
                if (Array.isArray(result)) {
                    setTrendingCoins(result);
                    console.log(trendingCoins.id);
                } else {
                    console.error("API response is not an array:", result);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error("Error fetching coins:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredCoins = trendingCoins.filter(
        coin => coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }

    return (
        <View style={styles.container}>
            <Navbar style={styles.navBar} navigation={navigation} />
            <SearchBar
                placeholder="Rechercher votre crypto..."
                value={search}
                onChangeText={setSearch}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredCoins}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Coin', { id: item.id })}>
                        <Image
                            style={styles.cryptoImage}
                            source={{ uri: item.image }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                            <Text style={styles.cryptoSymbol}>{item.symbol.toUpperCase()}</Text>
                            <Text style={styles.price}>{item.current_price} USD</Text>
                        </View>
                        <View style={styles.favoriteCoinContainer}>
                            <FavoriteCoin coinId={item.id} />
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
    favoriteCoinContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

});
