import {FontAwesome} from "@expo/vector-icons";
import {SplashScreen, Tabs} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded, error] = useFonts({
        'spacemono-regular':require('../assets/fonts/SpaceMono-Regular.ttf'),
        'spacemono-bold':require('../assets/fonts/SpaceMono-Bold.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <TabsLayout />;
}

function TabsLayout(){
    return (
        <Tabs screenOptions={{
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
            <Tabs.Screen name="(reviews)" options={
                {
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color}/>
                }
            }/>
            <Tabs.Screen name="about" options={
                {
                    title: "About",
                    tabBarIcon: ({color}) => <FontAwesome name="info" size={24} color={color}/>
                }
            }/>
        </Tabs>
    )
}