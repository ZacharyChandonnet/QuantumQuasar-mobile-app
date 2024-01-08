import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SearchScreen from './screens/Search';
import Nft from './screens/Nft';
import Coin from './screens/Coin';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="QuantumQuasar"
          component={HomeScreen}
          options={{
            title: 'Bienvenue sur QuantumQuasar',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Détails',
            headerShown: false
          }} />

        <Stack.Screen
          name="Nft"
          component={Nft}
          options={{
            title: 'Nft',
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search',
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Coin"
          component={Coin}
          options={{
            title: 'Coin',
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



