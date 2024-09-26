import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { UserModel } from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen: React.FC = () => {

    const [storedData, setStoredData] = useState<UserModel | null>(null);

    useEffect(() => {
        const getDataFromStorage = async () => {
            try {
                const jsonData = await AsyncStorage.getItem('user');
                if (jsonData !== null) {
                    setStoredData(JSON.parse(jsonData) as UserModel);
                }
            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        };

        getDataFromStorage();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Profile Information</Text>
            {storedData ? (
                <>
                    {storedData.photo ? <Image source={{ uri: storedData.photo }} style={styles.photo} /> : null}
                    <Text>Name: {storedData.name}</Text>
                    <Text>Phone: {storedData.phone}</Text>
                    <Text>Email: {storedData.email}</Text>
                    <Text>Address: {storedData.address}</Text>
                </>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    photoOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    photoButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    photoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        alignSelf: 'center',
    },
});


export default ProfileScreen;
