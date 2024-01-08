import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {

    const slideAnim = React.useRef(new Animated.Value(-800)).current;

    React.useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }
        ).start();
    }, [slideAnim]);

    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.backgroundImage} blurRadius={4}>
            <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>QuantumQuasar</Text>
                        <Text style={styles.sousTitle}>Votre porte monnaie de confiance</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.text}>Les cryptos sont le futur de la finance</Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
                            <Text style={styles.buttonText}>Débutons</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.65)',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 2, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,  
    },
    bottomContainer: {
        flex: 1,  
        alignItems: 'center',
        justifyContent: 'flex-start',  
    },
    title: {
        color: 'white',
        fontSize: 38,
        fontWeight: 'bold',
    },
    sousTitle: {
        color: 'white',
        fontSize: 18,
        marginTop: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginBottom: 15, 
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 20,
        width: 350,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
