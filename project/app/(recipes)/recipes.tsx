import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import RecipeItem from "../../components/RecipeItem";
import {useFonts} from "expo-font";

const RecipePage: React.FC = () => {
    const [loaded, errors] = useFonts({
        'KalamBold':require('../../assets/fonts/Kalam-Bold.ttf'),
        'KalamRegular':require('../../assets/fonts/Kalam-Regular.ttf'),
        'KalamLight':require('../../assets/fonts/Kalam-Light.ttf'),
    });

    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('chicken'); // Example search term
    const [searchQuery, setSearchQuery] = useState<string>(''); // Search term from input field
    const [noResults, setNoResults] = useState<boolean>(false);

    const app_id = '7d254b68'; // Your App ID
    const app_key = '16a2684bdfd34e95b15fa59969b25d54'; // Your API Key

    const fetchRecipes = async (query: string) => {
        setLoading(true);
        setError(null);
        setNoResults(false);
        try {
            const response = await fetch(
                `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            if (data.hits.length === 0) {
                setNoResults(true);
            }
            setRecipes(data.hits);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes(query);
    }, [query]);

    const handleSearch = () => {
        setQuery(searchQuery);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find the perfect Recipe</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for recipes"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch} // Trigger search on Enter
                />
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Text style={styles.buttonText}>🔍</Text>
                </TouchableOpacity>
            </View>
            {noResults && <Text style={styles.noResultsText}>No Recipes found!</Text>}
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <RecipeItem item={item} />
                )}
                keyExtractor={(item) => item.recipe.uri}
            />
        </View>
    );
};

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
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    button: {
        marginLeft: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    noResultsText: {
        marginBottom: 16,
        color: 'red',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecipePage;
