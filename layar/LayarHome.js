import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ambilPresensi } from "../Client";

export default function LayarHome(){
    const [daftar,setDaftar] = useState([])

    useEffect(()=>{    //dijalankan ketika halaman/screen tampil
        ambilDaftar()
    },[])

    async function ambilDaftar(){
        const res = await ambilPresensi()
        setDaftar(res)
    }

    // const ambilDaftar = async ()=>{
    //     const res = await ambilPresensi()
    //     setDaftar(res)
    // }

    return(
        <View style={style.container}>
            <Text>Ini Layar Home</Text>
            <FlatList data={daftar} keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <View style={style.card}>
                    <Text>{item.lat}</Text>
                    <Text>{item.lon}</Text>
                    <Text>{item.nama}</Text>
                    <Text>{item.waktu}</Text>
                </View>)
            }/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    card:{
        borderRadius:12,
        marginBottom:10,
        shadowColor:'#000',
        shadowRadius:4,
        elevation:2,
        backgroundColor:'#fff',
        padding:15,
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:400
    }
})

