import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { kirimPresensi } from "../Client";

export default function LayarPresensi() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [permissionStatus, setPermissionStatus] = useState("Tidak diijinkan");
    const [nama, setNama] = useState("");
    const [waktu, setWaktu] = useState("");

    const navigasi = useNavigation();

    function lihatDiklik() {
        navigasi.navigate("home");
    }

    useEffect(() => {
        let intervalId;

        (async () => {
            const servicesEnabled = await Location.hasServicesEnabledAsync();
            if (!servicesEnabled) {
                console.warn("Location services OFF. Aktifkan GPS / Location di device.");
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();
            console.log("permission status:", status);
            setPermissionStatus(status);

            if (status !== "granted") {
                console.warn("Permission lokasi ditolak");
                return;
            }

            await updateTickWithLocalStatus(status);

            intervalId = setInterval(() => updateTickWithLocalStatus(status), 1000);
        })();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    const updateTickWithLocalStatus = async (status) => {
        setWaktu(new Date().toTimeString().substring(0, 8)); 
        if (status !== "granted") return;

        try {
            const lokasi = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
            setLatitude(lokasi.coords.latitude);
            setLongitude(lokasi.coords.longitude);
        } catch (e) {
            // console.warn("Gagal baca lokasi:", e?.message ?? e);
            try {
                const last = await Location.getLastKnownPositionAsync();
                if (last) {
                    setLatitude(last.coords.latitude);
                    setLongitude(last.coords.longitude);
                }
            } catch { }
        }
    };

    const presensiDiklik = async () => {
        try {
            const resp = await kirimPresensi(latitude, longitude, nama, waktu);
            alert(resp);
        } catch (e) {
            alert("Gagal kirim presensi: " + (e?.message ?? e));
        }
    };

    return (
        <View style={style.container}>
            <Text>Ini Layar Presensi</Text>
            <Text>{waktu}</Text>
            <Text>{String(new Date())}</Text>

            <TextInput style={style.input} placeholder="latitude" value={String(latitude)} editable={false} />
            <TextInput style={style.input} placeholder="longitude" value={String(longitude)} editable={false} />
            <TextInput style={style.input} placeholder="nama" value={nama} onChangeText={setNama} />

            <TouchableOpacity style={style.button} onPress={presensiDiklik}>
                <Text>Presensi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={lihatDiklik}>
                <Text>Lihat Daftar Presensi</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f2f4f7", paddingHorizontal: 30, justifyContent: "center", alignItems: "center", gap: 10 },
    input: { borderWidth: 1, borderColor: "#dfe6e9", paddingHorizontal: 10, paddingVertical: 6, width: "100%", fontSize: 16, borderRadius: 8 },
    button: { backgroundColor: "#0984e3", borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
});
