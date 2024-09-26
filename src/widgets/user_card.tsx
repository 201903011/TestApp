// components/UserCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserCardProps {
    name: {
        first: string;
        last: string;
    };
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{`${name.first} ${name.last}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserCard;
