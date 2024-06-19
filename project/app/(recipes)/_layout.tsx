import { Stack } from 'expo-router';

export default function RecipeLayout(){
    return (
        <Stack screenOptions={{
            headerStyle:{
                backgroundColor: "#f4511e",

            },headerTintColor: "white",
            headerTitleStyle:{
                fontWeight: "bold"
            },
            tabBarActiveTintColor: "#f4511e",
            tabBarInactiveTintColor: "black"
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