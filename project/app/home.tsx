import {Image, StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';
import {useFonts} from "expo-font";
import React from "react";
import {useNavigation} from "@react-navigation/native";


export default function HomePage() {
    const [loaded, error] = useFonts({
        'KalamBold':require('../assets/fonts/Kalam-Bold.ttf'),
        'KalamRegular':require('../assets/fonts/Kalam-Regular.ttf'),
        'KalamLight':require('../assets/fonts/Kalam-Light.ttf'),
    });

    const navigation = useNavigation();

    const handlePressRecipe = ()=> {
        navigation.navigate('index');
    };


    const handlePressIngredients = ()=> {
        navigation.navigate('ingredients');
    };

    return (
        <ScrollView style={styles.container}>
            <View >
                <Text style={styles.title}>About RecipeReveal</Text>

                <Text style={styles.text}>Discover a world of culinary delight with ReceptReveal, your ultimate companion for recipe inspiration and ingredient discovery. Whether you're a seasoned chef or a kitchen novice, our app makes it easy to find the perfect recipe for any occasion.</Text>

                <Text style={styles.text}><Text style={styles.boldText}>Scan and Savour:</Text> Simply scan your ingredients, and ReceptReveal will suggest a variety of mouth-watering recipes tailored to what you have on hand. No more guessing what to make for dinner!</Text>
                    <TouchableOpacity style={styles.button} onPress={handlePressIngredients}>
                        <Text style={styles.buttonText}>Scan Ingredients</Text>
                    </TouchableOpacity>

                <Text style={styles.text}><Text style={styles.boldText}>Explore and Create:</Text> Dive into our extensive collection of recipes from around the globe. From quick and easy weeknight meals to gourmet dishes, there’s something to satisfy every palate.</Text>
                <TouchableOpacity style={styles.button}  onPress={handlePressRecipe}>
                    <Text style={styles.buttonText}>Find Recipes</Text>
                </TouchableOpacity>


                <Text style={styles.text}><Text style={styles.boldText}>Stay Organized:</Text> With ReceptReveal, meal planning and grocery shopping have never been easier. Keep track of ingredients, create shopping lists, and ensure you always have what you need to create delicious meals.</Text>

                <Text style={styles.text}>Join the ReceptReveal community today and transform your cooking experience. Let’s get started on your culinary journey!</Text>

                <Image  source={require('../assets/RecipeReveal.png')} style={styles.image} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontFamily: "KalamBold",
        marginBottom: 16,
        alignSelf: "center"
    },
    image: {
        height: 150,
        width: 380,
        marginVertical: 16,
    },
    boldText:{
        fontWeight: 'bold',
    },
    text:{
        marginBottom: 16,
        fontSize: 16,
    },
    button:{
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginBottom: 16,
        marginTop: -8,
        width: 130,
    },
    buttonText:{
        color: '#ffffff',
    }
});
