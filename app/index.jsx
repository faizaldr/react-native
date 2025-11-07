import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Alert, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

const api = axios.create({
    baseURL: "http://10.10.1.26:3000",
    timeout: 5000,
    headers: { 'Content-Type': "application/json" }
})

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const actionLogin = async () => {
        setLoading(!loading);
        const res = await api.post('/login', { username: username, password: password });
        if (res.status == 200) {
            await AsyncStorage.setItem("auth_token", String(res.data.token));
            router.replace("/(tabs)")
        } else {
            Alert.alert("Login Gagal");
        }
        setLoading(!loading);
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ImageBackground source={require('../assets/images/splash-icon.png')} style={{ flex: 1 }} resizeMode='center'>
                <View style={{ padding: 16 }}>
                    <Text style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 16 }}>LOGIN USER MAHASISWA</Text>
                    <Card style={{}}>
                        <Card.Content style={{ gap: 12, backgroundColor: "#0aa79171" }}>
                            <TextInput label="Username" value={username} onChangeText={setUsername}
                                left={<TextInput.Icon icon="account" />} mode='outlined' />
                            <TextInput label="Password" value={password} onChangeText={setPassword}
                                left={<TextInput.Icon icon="lock" />}
                                secureTextEntry={passwordSecure}
                                right={<TextInput.Icon icon={passwordSecure ? "eye" : "eye-off"} onPress={() => setPasswordSecure(!passwordSecure)} />}
                                mode='outlined' />
                            <Button disabled={loading} onPress={actionLogin}>
                                {loading ? "Tunggu.." : "Login"}</Button>
                        </Card.Content>
                    </Card>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}