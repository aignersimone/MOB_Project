import { Stack } from 'expo-router';

export default function ReviewLayout(){
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
                    headerTitle:"Review",
                }
            }></Stack.Screen>
            <Stack.Screen name="[id]" options={
                {
                    headerTitle:"Review Detail",
                }
            }></Stack.Screen>
        </Stack>
    )
}