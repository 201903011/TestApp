// components/SettingsScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Button } from 'react-native';
import * as NavigationService from "react-navigation-helpers";


const SettingsScreen: React.FC = () => {

    const onSubmit = async () => {
        await AsyncStorage.removeItem('isLogin');
        await AsyncStorage.removeItem('user')
        NavigationService.replace('Login');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="LogOut" onPress={onSubmit} />
        </View>
    )
};

export default SettingsScreen;
