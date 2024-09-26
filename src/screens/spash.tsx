import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as NavigationService from "react-navigation-helpers";


const SplashScreen: React.FC = () => {

    // const [depVar, setDepVar] = useState("");
    // useEffect(() => {
    //     console.log("temp");
    //     fetchData()
    // }, []);

    // const fetchData = async () => {
    //     console.log('Component Loaded');
    //     // AsyncStorage.getItem('isLogin').then(
    //     //     (value) => {
    //     //         if (value == "true") {
    //     //             NavigationService.replace('Home');
    //     //         } else {
    //     //             NavigationService.replace('Login');
    //     //         }
    //     //     },
    //     //     () => { }
    //     // ).catch(() => NavigationService.replace('Login'));
    //     // NavigationService.replace('Login')
    // }


    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Hello, world!</Text>
        </View>
    );
};

export default SplashScreen;
