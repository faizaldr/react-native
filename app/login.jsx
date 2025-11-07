import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { Alert, KeyboardAvoidingView, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    headers: { 'Content-Type': "application/json" }
})

export default function LoginScreen() {
    const router = useRouter();
    const { username, setUsername } = useState('');
    const { password, setPassword } = useState('');
    const { passwordSecure, setPasswordSecure } = useState(true);
    const { loading, setLoading } = useState(false);

    const actionLogin = async () => {
        setLoading((a) => !a);
        const res = await api.post('/login', { username: username, password: password });
        if (res.status == 200) {
            await AsyncStorage.setItem("auth_token", String(res.data.token));
            router.replace("/(tabs)/add")
        } else {
            Alert.alert("Login Gagal");
        }
        setLoading((a) => !a);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View>
                <Text style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 16 }}>LOGIN USER MAHASISWA</Text>
                <Card>
                    <Card.Content style={{ gap: 12 }}>
                        <TextInput label="Username" value={username} onChangeText={setUsername}
                            left={<TextInput.Icon icon="account" />} mode='outlined' />
                        <TextInput label="Password" value={password} onChangeText={setPassword}
                            left={<TextInput.Icon icon="lock" />}
                            right={<TextInput.Icon icon={passwordSecure ? "eye" : "eye-off"} onPress={() => setPasswordSecure((a) => !a)} />}
                            mode='outlined' />
                        <Button disabled={loading} onPress={actionLogin}>
                            {loading ? "Login" : "Tunggu.."}</Button>
                    </Card.Content>
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
}