import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function NftDetails({ route }) {
  const { id } = route.params;
  const [nftData, setNftData] = useState([]);
  const [nftDetails, setNftDetails] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [seeGraph, setSeeGraph] = useState(false);

  const toggleGraph = () => {
    setSeeGraph(!seeGraph);
  };

  useEffect(() => {
    const fetchNftData = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/nfts/${id}`);
        const result = await response.json();
        setNftData(result.floor_price?.prices || []);
        setNftDetails(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchNftData();
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="orange" style={styles.isLoading} />;
  }

  return (
    <ImageBackground
      source={{ uri: nftDetails.image?.small }}
      style={styles.backgroundImage}
      resizeMode='cover'
      blurRadius={1}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{nftDetails.name} ({id.toUpperCase()})</Text>
        <Text style={styles.detailText}>Floor Price: ${nftDetails.floor_price?.native_currency}</Text>

        <TouchableOpacity onPress={toggleGraph} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {seeGraph ? 'Hide the Chart' : 'Show the Chart'}
          </Text>
        </TouchableOpacity>

        {seeGraph && (
          nftData.length > 0 ? (
            <LineChart
              data={{
                labels: nftData.map(() => ''),
                datasets: [
                  {
                    data: nftData.map(dataPoint => dataPoint[1]),
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
            <Text style={styles.noDataText}>No data available</Text>
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
