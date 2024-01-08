import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';


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
          options={{ title: 'Détails',
          headerShown: false
         }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



