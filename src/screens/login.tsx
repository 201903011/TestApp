import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '../widgets';
import * as NavigationService from "react-navigation-helpers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import collect from 'collect.js';
import { UserModel, LoginFormData } from '../models';


const schema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const LoginForm: React.FC = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginFormData) => {

        await AsyncStorage.getItem('registerFormData').then(
            async (userListString) => {
                console.log(userListString);
                if (userListString != null && userListString != "") {
                    const userList = JSON.parse(userListString ?? "") as UserModel[] | null
                    const dummLis: UserModel[] = []
                    const collectObject = collect(userList ?? dummLis);
                    const filterData = collectObject.first<UserModel | null>((item, key) => item.email == data.email);
                    console.log(userList);
                    if (filterData) {
                        Alert.alert('Success', `Login successful for`);
                        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
                        await AsyncStorage.setItem('user', JSON.stringify(filterData));
                        NavigationService.replace('Home')
                    } else {
                        Alert.alert('Success', `Invalid Credential`);
                    }
                } else {
                    Alert.alert('Success', `Please Register Yourself`)
                }
            },
            (value) => {
                Alert.alert('Success', `Please Register Yourself `)
            },
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <Button title="Login" onPress={handleSubmit(onSubmit)} />
            <Link title="Dont Have Account, Register Here" onPress={() => NavigationService.push('Register')} />
        </SafeAreaView>
    );
};

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
});

export default LoginForm;