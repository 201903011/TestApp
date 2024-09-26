import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { LoginForm, RegisterForm, HomeScreen, SplashScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileScreen, ProductScreen, SettingsScreen, UserScreen } from '../components';
import { isReadyRef, navigationRef } from 'react-navigation-helpers';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Home" component={RenderTabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginForm} />
                <Stack.Screen name="Register" component={RegisterForm} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const RenderTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    var iconName = "person";

                    if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'User') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Product') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    }

                    // Return the icon component
                    return <Icon name={iconName} color={color} size={30} />;
                },
                tabBarShowLabel: false, // Hide the label
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="User" component={UserScreen} />
            <Tab.Screen name="Product" component={ProductScreen} />
        </Tab.Navigator>
    );
};
export default Navigation