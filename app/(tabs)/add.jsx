import ParallaxScrollView from '@/components/parallax-scroll-view';
import * as Location from 'expo-location';
import { useState } from "react";
import { Alert } from "react-native";

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
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.accuracy.High });
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
    }

    return(
        <ParallaxScrollView>
            
        </ParallaxScrollView>
    )
}