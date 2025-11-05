import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput,  TouchableOpacity, View } from "react-native"
import { kirimPresensi } from "../Client"
import { useNavigation } from "@react-navigation/native"

export default function LayarPresensi(){
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] = useState(0)
    const [nama,setNama] = useState('')
    const [waktu,setWaktu] = useState('')

    const navigasi = useNavigation()
    function lihatDiklik(){
        navigasi.navigate('home')
    }

    //otomatis jalan saat halaman ini tampil
    useEffect(()=>{
        const timerID = setInterval(detik,1000)

        return ()=>{
            clearInterval(timerID)
        }
    },[])

    async function detik(){
        setWaktu((new Date()+'').substring(16,24))
        //baca lokasi
        let { status} = await requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            return;
        }
        let lokasi = await getCurrentPositionAsync({})
        setLatitude(lokasi.coords.latitude)
        setLongitude(lokasi.coords.longitude)
        console.log(`${latitude} ${longitude}`)

    }

    async function presensiDiklik(){
        const resp = await kirimPresensi(latitude,longitude,nama,waktu)
        alert(resp)
    }

    return(
        <View style={style.container}>
            <Text>Ini Layar Presensi</Text>
            <Text>{waktu}</Text>
            <TextInput style={style.input} placeholder="latitude" value={latitude}/>
            <TextInput style={style.input} placeholder="longitude" value={longitude}/>
            <TextInput style={style.input} placeholder="nama" onChangeText={setNama}/>
            <TouchableOpacity style={style.button} onPress={presensiDiklik}>
                <Text>Presensi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={lihatDiklik}>
                <Text>Lihat Daftar Presensi</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f4f7',
        paddingHorizontal:30,
        justifyContent:'center',
        alignItems:'center',
    },
    input:{
        borderWidth:1,
        borderColor:'#dfe6e9',
        marginBottom:10,
        fontSize:20
    },
    button:{
        backgroundColor:'#0984e3',
        borderRadius:20,
        paddingHorizontal:20
    }
})