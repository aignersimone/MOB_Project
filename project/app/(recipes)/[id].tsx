import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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
    console.log(recipe);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>{recipe.label}</Text>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.heading}>Ingredients:</Text>
            {recipe.ingredientLines.map((item, index) => (
                <Text key={index} style={styles.ingredient}>• {item}</Text>
            ))}
            <Text style={styles.heading}>Details:</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Cuisine Type:</Text> {recipe.cuisineType.join(', ')}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Dish Type:</Text> {recipe.dishType.join(', ')}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Cautions:</Text> {recipe.cautions.join(', ')}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Calories: </Text>{recipe.calories.toFixed(2)}</Text>
            {/*<Text style={styles.detail}><Text style={styles.boldText}>Diet Labels:</Text> {recipe.dietLabels.join(', ')}</Text>*/}
            <Text style={styles.detail}><Text style={styles.boldText}>Health Labels:</Text></Text>
            <View style={styles.tagsContainer}>
                {recipe.healthLabels.map((label, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{label}</Text>
                    </View>
                ))}
            </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 25,
        color: "#f4511e",
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 4,
    },
    detail: {
        fontSize: 16,
        marginVertical: 2,
        marginTop: 14,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 8,
        marginBottom: 35,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        margin: 4,
    },
    tagText: {
        fontSize: 14,
        color: '#333',
    },
    boldText:{
        fontWeight: 'bold',
    }
});
