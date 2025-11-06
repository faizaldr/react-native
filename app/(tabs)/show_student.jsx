import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

export default function ShowStudent() {
    const [studentList, setStudentList] = useState([]);

    const api = axios.create({
        baseURL: "http://10.10.1.26:3000",
        timeout: 5000

    })

    useEffect(
        () => {
            getPresention();
        }, [])

    const getPresention = async () => {
        try {
            const res = await api.get('/mahasiswa');
            if (res.status == 200 || res.status == 201) {
                setStudentList(res.data);
            }
            return res.data;
        } catch (error) {
            Alert.alert(`Data tidak ada, ${error}`);
        }
    }

    return (
        <View style={{ padding: 16, gap: 16 }}>
            <Text variant="headlineMedium" style={{ fontWeight: 'bold', fontSize:20 }} >Daftar Presensi Mahasiswa</Text>
            <Button onPress={getPresention}>
                Refresh
            </Button>

            <FlatList data={studentList} keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Title title={(
                            <Text style={{ fontWeight: 'bold' }} >{item.nama.toUpperCase()} </Text>
                        )} />
                        <Card.Content style={{ gap: 10 }}>
                            <Text>{item.mata_kuliah}</Text>
                            <Text>{item.waktu}</Text>
                            <View style={{ alignItems: "center" }} ><Text>{item.lat}, {item.lon}</Text></View>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    )
}