import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import {router} from "expo-router";

const RecipePage: React.FC = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>(''); // Beispiel-Suchbegriff
    const [searchQuery, setSearchQuery] = useState<string>(''); // Suchbegriff von Eingabefeld
    const [noResults, setNoResults] = useState<boolean>(false);

    const app_id = '7d254b68'; // Deine App ID
    const app_key = '16a2684bdfd34e95b15fa59969b25d54'; // Dein API Key

    const fetchRecipes = async (query: string) => {
        setLoading(true);
        setError(null);
        setNoResults(false);
        try {
            const response = await fetch(
                `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`
            );

            if (!response.ok) {
                throw new Error(`Fehler: ${response.status}`);
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
                <Text>Fehler: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find the perfect Recipe</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Suche nach Rezepten"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Text style={styles.buttonText}>🔍</Text>
                </TouchableOpacity>
            </View>
            {noResults && <Text style={styles.noResultsText}>No Recipes found!</Text>}
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({pathname:item.recipe.label, params:item})}>
                        <View style={styles.recipeItem}>
                            <Image
                                source={{ uri: item.recipe.image }}
                                style={styles.recipeImage}
                            />
                            <Text>{item.recipe.label}</Text>
                        </View>
                    </TouchableOpacity>
                )}
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
        fontWeight: 'bold',
        marginBottom: 16,
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
    recipeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#F89678',
        borderRadius: 4,
    },
    recipeImage: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecipePage;
