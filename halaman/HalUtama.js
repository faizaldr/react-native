import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LayarHome from "../layar/LayarHome"
import LayarPresensi from "../layar/LayarPresensi"

export default function HalUtama(){
    const Stack = createNativeStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="presensi" component={LayarPresensi}/>
            <Stack.Screen name="home" component={LayarHome}/>
        </Stack.Navigator>
    )
}