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
    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
                <Text variant="headlineMedium">Presensi Mahasiswa</Text>

                <Card>
                    <Card.Title title="Form Presensi" />
                    <Card.Content style={{ gap: 10 }}>
                        <TextInput label="Nama mahasiswa" value={name} onChangeText={{ setName }} mode='outlined' />
                        <TextInput label="Mata kuliah" value={course} onChangeText={{ setCourse }} mode='outlined' />
                        <Button mode='containered' onPress={getLocation} icon={loadingLoc ? 'progress-clock' : 'crosshairs-gps'}>
                            {loadingLoc ? "Mengambil Lokasi" : "ambil lokasi"}
                        </Button>
                        <Button disabled={latitude == null} mode='containered'
                            onPress={getLocation} icon={latitude == null ? 'near-me-disabled' : 'send'}>
                            Kirim
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>

        </View>
    )
}