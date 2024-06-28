import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function RecipeDetail() {
    let params = useLocalSearchParams();

    console.log(params);

    // Destructure the params to extract the values
    const {
        label,
        image,
        ingredientLines,
        cuisineType,
        mealType,
        dishType,
        cautions,
        calories,
        healthLabels,
        totalTime,
        yield: servings
    } = params;

    // Parse ingredients and health labels
    const ingredients = ingredientLines ? ingredientLines.split(',') : [];
    const healthLabelsList = healthLabels ? healthLabels.split(',') : [];

    // Log image URI to verify it
    console.log("Image URI: ", image);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {/*{image && (*/}
            {/*    <Image source={{ uri: image }} style={styles.image}*/}
            {/*    />*/}
            {/*)}*/}
            <Text style={styles.heading}>Ingredients:</Text>
            {ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
            ))}
            <Text style={styles.heading}>Details:</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Meal Type: </Text>{mealType}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Cuisine Type:</Text> {cuisineType}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Dish Type:</Text> {dishType}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Cautions:</Text> {cautions}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Calories: </Text>{parseFloat(calories).toFixed(2)}</Text>
            <Text style={styles.detail}><Text style={styles.boldText}>Servings: </Text>{servings}</Text>
            <Text style={styles.heading}>Health Labels:</Text>
            <View style={styles.tagsContainer}>
                {healthLabelsList.map((label, index) => (
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
