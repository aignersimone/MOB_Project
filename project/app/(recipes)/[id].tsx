import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";

async function fetchRecipe(uri) {
    const decodedUri = uri.replace(/%20/g, ' ');

    const url = `https://api.edamam.com/search?q=${decodedUri}&app_id=7d254b68&app_key=16a2684bdfd34e95b15fa59969b25d54`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits.length > 0) {
            return data.hits[0].recipe;
        } else {
            console.log("Kein Rezept gefunden.");
            return null;
        }
    } catch (error) {
        console.error("Fehler bei der Fetch-Anfrage:", error);
        return null;
    }
}

export default function RecipeDetail() {
    const route = useRoute();
    const { id } = route.params;
    const name = id.replace(/%20/g, ' ');

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const loadRecipe = async () => {
            const fetchedRecipe = await fetchRecipe(name);
            setRecipe(fetchedRecipe);
        };

        loadRecipe();
    }, [name]);

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>{recipe.label}</Text>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.heading}>Ingredients:</Text>
            {recipe.ingredientLines.map((item, index) => (
                <Text key={index} style={styles.ingredient}>• {item}</Text>
            ))}
            <Text style={styles.heading}>Details:</Text>
            <Text style={styles.detail}>Calories: {recipe.calories.toFixed(2)}</Text>
            <Text style={styles.detail}>Cuisine Type: {recipe.cuisineType.join(', ')}</Text>
            <Text style={styles.detail}>Diet Labels: {recipe.dietLabels.join(', ')}</Text>
            <Text style={styles.detail}>Dish Type: {recipe.dishType.join(', ')}</Text>
            <Text style={styles.detail}>Health Labels: {recipe.healthLabels.join(', ')}</Text>
            <Text style={styles.detail}>Cautions: {recipe.cautions.join(', ')}</Text>
            <Text style={styles.detail}>Source: {recipe.source}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 4,
    },
    detail: {
        fontSize: 16,
        marginVertical: 2,
    },
});
