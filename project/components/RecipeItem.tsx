import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface RecipeItemProps {
    item: any; // Define a proper type based on your recipe item structure
}

const RecipeItem: React.FC<RecipeItemProps> = ({ item }) => {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: item.recipe.label, params: { uri: item.recipe.uri } })}>
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
    },
});

export default RecipeItem;
