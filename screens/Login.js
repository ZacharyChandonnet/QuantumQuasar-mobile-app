import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../FirebaseConfig.js";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Changed default state to false

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
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                autoCapitalize='none' 
                onChangeText={text => setEmail(text)} 
                value={email} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                autoCapitalize='none' 
                onChangeText={text => setPassword(text)} 
                value={password} 
                secureTextEntry={true} 
            />
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
        width: 300,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
