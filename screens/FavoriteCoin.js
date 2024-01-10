import React, { useState, useEffect } from 'react';
import { setDoc, doc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../FirebaseConfig.js';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function FavoriteCoin({ coinId }) {
    const [isFavorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchUserFavorites = async () => {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.exists()) {
                const userFavorites = userDoc.data().CoinsLike || [];
                setFavorite(userFavorites.includes(coinId));
            }
        };

        fetchUserFavorites();
    }, [coinId]);

    const toggleFavorite = async () => {
        if (isFavorite) {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                CoinsLike: arrayRemove(coinId)
            }, { merge: true });
        } else {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                CoinsLike: arrayUnion(coinId)
            }, { merge: true });
        }
        setFavorite(!isFavorite);
    }

    return (
        <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons style={styles.stars} name="star" size={24} color={isFavorite ? "orange" : "gray"} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    stars: {
        padding: 15,
    },
});
