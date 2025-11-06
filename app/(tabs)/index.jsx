import axios from 'axios';
import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';

export default function AddStudent() {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [time, setTime] = useState('');
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [loadingLoc, setLoadingLoc] = useState();

    const api = axios.create({
        baseURL: "http://10.10.1.26:3000",
        timeout: 5000

    })
    const sentPresention = async (latitude, longitude, name, course) => {
        try {
            const time = new Date();
            const res = await api.post('/mahasiswa', 
                { lat: latitude, lon: longitude, nama: name, mata_kuliah: course, waktu: time });
            if (res.status == 200 || res.status == 201) {
                Alert.alert(`Data berhasil terkirim`);
            }
            return res.data;
        } catch (error) {
            Alert.alert(`Data tidak terkirim, ${error}`);
        }
    }

    const getLocation = async () => {
        setLoadingLoc(true);
        const { status } = await Location.requestForegroundPermissionsAsync()
            && await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Izin Lokasi ditolak!")
            return;
        }
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        console.log(latitude);
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
                <Text variant="headlineMedium">Presensi Mahasiswa</Text>

                <Card>
                    <Card.Title title="Form Presensi" />
                    <Card.Content style={{ gap: 10 }}>
                        <TextInput label="Nama mahasiswa" value={name}
                            onChangeText={setName} mode='outlined' />
                        <TextInput label="Mata kuliah" value={course}
                            onChangeText={setCourse} mode='outlined' />
                        <Button mode='containered' onPress={getLocation}
                            icon={loadingLoc ? 'progress-clock' : 'crosshairs-gps'}>
                            {loadingLoc ? "Mengambil Lokasi" : "ambil lokasi"}
                        </Button>
                        <View style={{ alignItems: "center" }} ><Text>{latitude}, {longitude}</Text></View>
                        <Button disabled={latitude == null} mode='containered'
                            onPress={() => { sentPresention(latitude, longitude, name, course); }} icon={latitude == null ? 'alarm-off' : 'send'}>
                            Kirim
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>

        </View>
    )
}