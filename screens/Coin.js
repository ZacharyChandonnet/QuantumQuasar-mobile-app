import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Coin({ route }) {
    const { id } = route.params;
    const [coinData, setCoinData] = useState([]);
    const [coinDetails, setCoinDetails] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [seeGraph, setSeeGraph] = useState(false);

    const toggleGraph = () => {
        setSeeGraph(!seeGraph);
    }

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`);
                const result = await response.json();
                setCoinData(result.prices);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching coin data:", error);
            }
        };

        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                const result = await response.json();
                setCoinDetails(result);
            } catch (error) {
                console.error("Error fetching coin details:", error);
            }
        };

        fetchCoinData();
        fetchCoinDetails();
    }, [id]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
    }

    return (
        <ImageBackground
            source={{ uri: coinDetails.image?.large }}
            style={styles.backgroundImage}
            resizeMode='contain'
            blurRadius={5}
            opacity={0.5}   
        >
            <View style={styles.container}>
                <Text style={styles.text}>{coinDetails.name} ({id.toUpperCase()})</Text>
                <Text style={styles.detailText}>Prix actuel : ${coinDetails.market_data?.current_price?.usd} USD</Text>
                <Text style={styles.detailText}>Capitalisation boursière : ${coinDetails.market_data?.market_cap?.usd}</Text>
                <Text style={styles.detailText}>Volume sur 24h : ${coinDetails.market_data?.total_volume?.usd}</Text>

                <TouchableOpacity onPress={toggleGraph} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>{seeGraph ? 'Masquer le graphique' : 'Afficher le graphique'}</Text>
                </TouchableOpacity>

                {seeGraph && (
                    coinData && coinData.length > 0 ? (
                        <LineChart
                            data={{
                                labels: coinData.map((dataPoint) => ''),
                                datasets: [
                                    {
                                        data: coinData.map((dataPoint) => dataPoint[1]),
                                    },
                                ],
                            }}
                            width={385}
                            height={320}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            withInnerLines={false}
                            withOuterLines={true}
                            chartConfig={{
                                backgroundColor: "#121212",
                                backgroundGradientFrom: "#121212",
                                backgroundGradientTo: "#121212",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "1",
                                    strokeWidth: "1",
                                    stroke: "#ffa500",
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    ) : (
                        <Text style={styles.noDataText}>Pas de données disponibles</Text>
                    )
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'orange',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: 'uppercase',
        marginTop: 20,
    },
    detailText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
    },
    noDataText: {
        color: 'white',
        fontSize: 16,
        fontStyle: 'italic',
    },
    isLoading: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
    },
    toggleButton: {
        backgroundColor: 'orange',
        padding: 8,
        borderRadius: 5,
        marginTop: 20,
    },
    toggleButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
