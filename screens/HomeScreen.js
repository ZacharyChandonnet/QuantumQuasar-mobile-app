import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Bienvenue sur QuantumQuasar</Text>
        <Button
            title="Voir le marché"
            onPress={() => navigation.navigate('Details')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white', 
  },
});
