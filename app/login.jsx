import axios from 'axios';

import { KeyboardAvoidingView, View } from 'react-native';
import { Text } from 'react-native-paper';

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    headers: { 'Content-Type': "application/json" }
})

export default function LoginScreen() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View>
                <Text style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 16 }}>LOGIN USER MAHASISWA</Text>

                

            </View>

        </KeyboardAvoidingView>
    );
}