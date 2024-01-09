import { setDoc, doc } from 'firebase/firestore';
import {db} from '../FirebaseConfig.js';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';

export default function FavoriteCoin() {

    return (
        <View>
            <Ionicons style={styles.stars} name="star" size={24} color="gray" />
        </View>
    );
}

const styles = StyleSheet.create({
    stars: {
     opacity: 0.5,
     padding: 15,
    },
});

