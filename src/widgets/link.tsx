// components/Link.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LinkProps {
    title: string;
    onPress: () => void;
}

const Link: React.FC<LinkProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.link}>
            <Text style={styles.linkText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        marginVertical: 10,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
});

export default Link;
