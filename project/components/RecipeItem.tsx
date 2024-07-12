import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Definition eines geeigneten Typen auf der Grundlage der Struktur des Rezepts
interface RecipeItemProps {
    item: any;
}

//React Functional Component (FC) namens RecipeItem mit TypeScript
const RecipeItem: React.FC<RecipeItemProps> = ({ item }) => {
    //router für die Weiterleitung zur Detailseite verwenden
    const router = useRouter();

    //Rückgabe des Listenelementes eines Rezeptes
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: item.recipe.label, params: item.recipe })}>
            <View style={styles.recipeItem}>
                <Image
                    source={{ uri: item.recipe.image }}
                    style={styles.recipeImage}
                />
                <Text style={styles.label}>{item.recipe.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

//Styling definieren
const styles = StyleSheet.create({
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#DBD9DD',
        borderRadius: 4,
    },
    recipeImage: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    label: {
        fontSize: 16,
        paddingEnd: 2,
        width: 250,

    },
});

export default RecipeItem;
