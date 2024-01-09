import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Coin({ route }) {
    const { id } = route.params;
    const [coinData, setCoinData] = useState([]);
    const [coinDetails, setCoinDetails] = useState({});
    const [isLoading, setLoading] = useState(true);

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
            resizeMode='cover'
            blurRadius={1}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{coinDetails.name} ({id.toUpperCase()})</Text>
                <Text style={styles.detailText}>Prix actuel : ${coinDetails.market_data?.current_price?.usd}</Text>
                <Text style={styles.detailText}>Capitalisation boursière : ${coinDetails.market_data?.market_cap?.usd}</Text>
                <Text style={styles.detailText}>Volume sur 24h : ${coinDetails.market_data?.total_volume?.usd}</Text>

                {coinData && coinData.length > 0 ? (
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
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingTop: 70,
    },
    text: {
        color: 'orange',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    detailText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
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
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
