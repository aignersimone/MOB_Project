import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from "@expo/vector-icons";
import RecipeItem from "./RecipeItem";

const ClarifaiModel = () => {
    const [images, setImages] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [analyzing, setAnalyzing] = useState(false); // State für User-feedback während der Analyse
    const [loadingRecipes, setLoadingRecipes] = useState(false); // State für User-feedback während der Analyse

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uri = result.assets[0].uri;
            setImages((prevImages) => [...prevImages, uri]);
            setAnalyzing(true); // Start displaying analyzing message
            analyzeImage(uri);
        }
    };

    const loadRecipe = () => {
        const app_id = '7d254b68'; // Your App ID
        const app_key = '16a2684bdfd34e95b15fa59969b25d54'; // Your API Key

        const ingredientsQuery = ingredients.join(' ');
        console.log(ingredientsQuery);

        setLoadingRecipes(true); // Start displaying recipe loading message

        fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientsQuery}&app_id=${app_id}&app_key=${app_key}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLoadingRecipes(false); // Stop displaying recipe loading message
                if (data.hits && data.hits.length > 0) {
                    const filteredRecipes = data.hits.filter(recipe => {
                        return ingredients.some(ingredient =>
                            recipe.recipe.ingredientLines.join(' ').toLowerCase().includes(ingredient.toLowerCase())
                        );
                    });

                    setRecipes(filteredRecipes);
                } else {
                    alert('No recipes found');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoadingRecipes(false); // Stop displaying recipe loading message in case of error
            });
    };

    const analyzeImage = async (uri: string) => {
        const PAT = '2a2b21785c7d4125a9be11c657754f53';
        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        const MODEL_ID = 'food-item-recognition';
        const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';

        const base64Image = await fetch(uri)
            .then((res) => res.blob())
            .then((blob) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            });

        const raw = JSON.stringify({
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
            },
            inputs: [
                {
                    data: {
                        image: {
                            base64: base64Image.split(',')[1],
                        },
                    },
                },
            ],
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Key ' + PAT,
            },
            body: raw,
        };

        try {
            const response = await fetch(
                `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
                requestOptions
            );
            const result = await response.json();
            const foodName = result.outputs[0].data.concepts[0].name;
            setResults((prevResults) => [...prevResults, foodName]);
            setIngredients((prevIngredients) => [...prevIngredients, foodName]);
            setAnalyzing(false); // Stop displaying analyzing message
        } catch (error) {
            console.error('Error:', error);
            setResults((prevResults) => [...prevResults, 'Error fetching model results']);
            setAnalyzing(false); // Stop displaying analyzing message in case of error
        }
    };

    const deleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setResults((prevResults) => prevResults.filter((_, i) => i !== index));
        setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View>
                    <Text style={styles.mar}>1.  Scan your ingredients</Text>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Take Photo</Text>
                    </TouchableOpacity>
                    <View style={styles.imageRow}>
                        {images.map((uri, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri }} style={styles.image} />
                                {results[index] && <Text style={styles.result}>{results[index]}</Text>}
                                <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteImage(index)}>
                                    <FontAwesome name="trash" size={20} color='black'/>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {analyzing && <Text style={styles.info}>Analyzing ingredient...</Text>}
                </View>

                <View>
                    <Text>2.  Show Recipe with these ingredients</Text>
                    <TouchableOpacity style={styles.button} onPress={loadRecipe}>
                        <Text style={styles.buttonText}>Show Recipe</Text>
                    </TouchableOpacity>
                    {loadingRecipes && <Text style={styles.info}>Loading recipes...</Text>}
                    {recipes.length > 0 && (
                        <FlatList
                            data={recipes}
                            renderItem={({ item }) => <RecipeItem item={item} />}
                            keyExtractor={(item) => item.recipe.uri}
                            contentContainerStyle={styles.recipesContainer}
                        />
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        margin: 5,
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 100,
        height: 100,
    },
    result: {
        marginTop: 5,
        textAlign: 'center',
        color: 'black',
    },
    deleteIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    buttonText: {
        color: 'white',
    },
    button: {
        borderColor: '#f4511e',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginBottom: 16,
        marginTop: 8,
    },
    recipesContainer: {
        marginTop: 20,
    },
    info:{
        color:'#f4511e',
        marginBottom: 15,
    },
    mar:{
        marginTop:40,
    }
});

export default ClarifaiModel;
