import { Stack } from 'expo-router';
import {useFonts} from "expo-font";

export default function RecipeLayout(){
    const [loaded, error] = useFonts({
        'KalamBold':require('../../assets/fonts/Kalam-Bold.ttf'),
        'KalamRegular':require('../../assets/fonts/Kalam-Regular.ttf'),
        'KalamLight':require('../../assets/fonts/Kalam-Light.ttf'),
    });

    return (
        <Stack screenOptions={{
            headerStyle:{
                backgroundColor: "#f4511e",

            },headerTintColor: "white",
            headerTitleStyle:{
                fontFamily: "KalamBold",
                fontWeight: "bold",
                fontSize: 20
            },
            tabBarActiveTintColor: "#f4511e",
            tabBarInactiveTintColor: "black"
            padding: 8,
        }
        }>
            <Stack.Screen name="index" options={
                {
                    headerTitle:"Recipes",
                }
            }></Stack.Screen>
            <Stack.Screen name="[id]" options={
                {
                    headerTitle:"Recipe Detail",
                }
            }></Stack.Screen>
        </Stack>
    )
}