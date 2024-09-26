import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { Link } from '../widgets';
import * as NavigationService from "react-navigation-helpers";
import collect from 'collect.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../models';


const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    // photo: Yup.string().required('Photo is required'),
});

const RegisterForm: React.FC = () => {

    const [formData, setFormData] = useState<UserModel>({
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        photo: '',
    });


    const { control, handleSubmit, formState: { errors }, setValue } = useForm<UserModel>({
        resolver: yupResolver(schema),
    });

    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const onSubmit = async (data: UserModel) => {
        // console.log(data);
        // const userListString; 
        await AsyncStorage.getItem('registerFormData').then(
            async (userListString) => {
                console.log(userListString);
                // if (userListString != null && userListString != "") {
                let userList: UserModel[] = JSON.parse(userListString ?? "") as UserModel[] | null ?? []

                const dummLis: UserModel[] = []
                const collectObject = collect(userList ?? dummLis);
                let alreadyPre: boolean = false;
                userList.forEach(element => {
                    if (element.email == data.email) {
                        alreadyPre = true;
                    }
                });
                // console.log("userList");
                // console.log(filterData);
                if (!alreadyPre) {
                    userList?.push(data);
                    // console.log(userList);

                    await AsyncStorage.setItem('registerFormData', JSON.stringify(userList))
                    Alert.alert('Success', `Registration successful for ${data.name}`);
                    NavigationService.pop();
                } else {
                    Alert.alert('Success', `Email Already Present ${data.name}`);
                }
                // } else {
                //     await AsyncStorage.setItem('registerFormData', JSON.stringify([formData]))
                //     Alert.alert('Success', `Registration successful for ${data.name}`)
                // NavigationService.pop();
                // }
            },
            async (value) => {
                await AsyncStorage.setItem('registerFormData', JSON.stringify([data]))
                Alert.alert('Success', `Registration successful for ${data.name}`)
                NavigationService.pop();
            },
        ).then(
            () => { },
            async () => {
                await AsyncStorage.setItem('registerFormData', JSON.stringify([data]))
                Alert.alert('Success', `Registration successful for ${data.name}`)
                NavigationService.pop();
            }
        )
            .catch(
                async () => {
                    await AsyncStorage.setItem('registerFormData', JSON.stringify([data]))
                    Alert.alert('Success', `Registration successful for ${data.name}`)
                    NavigationService.pop();
                }
            )


        // localStorage.setItem('registerFormData', JSON.stringify(formData));
        // Alert.alert('Success', `Registration successful for ${data.name}`);
        // Perform registration logic (e.g., API call)
    };

    const handleChoosePhotoFromLibrary = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            handlePhotoResponse(response.assets);
        });
    };


    const handlePhotoResponse = (assets: Asset[] | undefined) => {
        if (assets && assets.length > 0) {
            const selectedPhoto = assets[0];
            setPhotoUri(selectedPhoto.uri || null);
            setValue('photo', selectedPhoto.uri || '');  // Set photo value in form
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            {/* Name Field */}
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

            {/* Phone Field */}
            <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="phone-pad"
                    />
                )}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

            {/* Email Field */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            {/* Address Field */}
            <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

            {/* Password Field */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            {/* Photo Upload Options */}
            <View style={styles.photoOptions}>
                <TouchableOpacity onPress={handleChoosePhotoFromLibrary} style={styles.photoButton}>
                    <Text style={styles.photoButtonText}>Choose Photo</Text>
                </TouchableOpacity>

            </View>

            {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}
            {errors.photo && <Text style={styles.errorText}>{errors.photo.message}</Text>}

            <Button title="Register" onPress={handleSubmit(onSubmit)} />
            <Link title="Already Have Account, Login" onPress={() => NavigationService.pop()} />
        </View>
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

export default RegisterForm;
