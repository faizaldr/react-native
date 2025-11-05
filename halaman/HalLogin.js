import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { useZustand } from "../useZustand";

export default function HalLogin(){

    const [username, setUsername] = useState('')         //state lokal
    const [password, setPassword] = useState('')         //state lokal
    const { login } = useZustand()                       //state global

    function loginKlik(){
        if(username === 'tes' && password === '123'){
            login(username)
        }else{
            alert('Gagal Login','Username atau Password salah')
        }
    }

    return(
        <View style={style.container}>
            <Text>Ini Halaman Login</Text>
            <TextInput style={style.input} placeholder="Masukkan Username" onChangeText={setUsername}/>
            <TextInput style={style.input} placeholder="Masukkan Password" secureTextEntry onChangeText={setPassword}/>
            <TouchableOpacity style={style.button} onPress={loginKlik}>
                <Text>Login</Text>
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