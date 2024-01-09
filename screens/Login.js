import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../FirebaseConfig.js";
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Details');
        } catch (error) {
            alert('Email ou mot de passe incorrect');
            console.log(error);
        }
        setLoading(false);
    }

    const signUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Details');
        } catch (error) {
            alert('Email ou mot de passe invalide');
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/login.jpg')} style={styles.backgroundImage}>
                <Ionicons name="person-circle-outline" style={
                    {
                        marginBottom: 20,
                    }
                } size={100} color="white" />
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={24} color="orange" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            autoCapitalize='none'
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={24} color="orange" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            autoCapitalize='none'
                            onChangeText={text => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="orange" />
                    ) : (
                        <>
                            <TouchableOpacity style={styles.button} onPress={signIn}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={signUp}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ImageBackground>
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
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    icon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        height: 50,
        padding: 10,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
