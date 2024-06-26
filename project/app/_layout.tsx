import {FontAwesome} from "@expo/vector-icons";
import {SplashScreen, Tabs} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    //Schriftarten laden
    const [loaded, error] = useFonts({
        'KalamBold':require('../assets/fonts/Kalam-Bold.ttf'),
        'KalamRegular':require('../assets/fonts/Kalam-Regular.ttf'),
        'KalamLight':require('../assets/fonts/Kalam-Light.ttf'),
    });

    //Der Expo Router verwendet Error Boundaries, um Fehler im Navigationsbaum abzufangen.
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
    //Tablayout festlegen
    return (
        <Tabs screenOptions={{
            headerStyle:{
                backgroundColor: "#f4511e",

            },headerTintColor: "white",
            headerTitleStyle:{
                fontWeight: "bold",
                fontFamily: "KalamBold",
                fontSize: 20
            },
            tabBarActiveTintColor: "#f4511e",
            tabBarInactiveTintColor: "black"
        }
        }>
            <Tabs.Screen name="(recipes)" options={
                {
                    headerShown: false,
                    title: "Recipes",
                    tabBarIcon: ({color}) => <FontAwesome name="book" size={24} color={color}/>
                }
            }/>
            <Tabs.Screen name="index" options={
                {
                    title: "Home",
                    tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color}/>
                }
            }/>
            <Tabs.Screen name="ingredients" options={
                {
                    title: "IngredientScan",
                    tabBarIcon: ({color}) => <FontAwesome name="camera" size={24} color={color}/>
                }
            }/>
        </Tabs>
    )
}