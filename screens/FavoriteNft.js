import React, { useState, useEffect } from 'react';
import { setDoc, doc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db, auth } from '../FirebaseConfig.js';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function FavoriteCoin({nftId, name, price, image, symbol}) {
    const [isFavorite, setFavorite] = useState(false);
    const [nftLike, setNftLike] = useState();

    useEffect(() => {
        const fetchUserFavorites = async () => {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.exists()) {
                const userFavorites = userDoc.data().NftLike || [];
                const newNftLike = {
                    id: nftId,
                    image: image,
                    name: name,
                    price: price,
                    symbol: symbol
                }
                setFavorite(userFavorites.includes(newNftLike));
                setNftLike(newNftLike);     
            }
        };

        fetchUserFavorites();
    }, [nftId]);

    const toggleFavorite = async () => {
        if (isFavorite) {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                NftLike: arrayRemove(nftLike)
            }, { merge: true });
        } else {
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                NftLike: arrayUnion(nftLike)
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
