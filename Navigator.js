import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import HalLogin from "./halaman/HalLogin";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HalUtama from "./halaman/HalUtama";
import { useZustand } from "./useZustand";

const Stack = createNativeStackNavigator()
export default function Navigator(){
    const {pengguna} = useZustand()
    return(
        <NavigationContainer>
            { pengguna=== '' ? <Text>TRUE</Text> : <Text>FALSE</Text> }
            { 'badu'=== '' ? <HalLogin/> : <HalUtama/> }
            {/* <Stack.Navigator>
                <Stack.Screen name="login" component={HalLogin}/>
                <Stack.Screen name="utama" component={HalUtama}/>
            </Stack.Navigator> */}
            
        </NavigationContainer>
    )
}