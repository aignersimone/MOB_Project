import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';

const AboutPage: React.FC = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const app_id = '7d254b68'; // Deine App ID
    const app_key = '16a2684bdfd34e95b15fa59969b25d54'; // Dein API Key
    const query = 'chicken'; // Beispiel-Suchbegriff

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(
                    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`
                );

                if (!response.ok) {
                    throw new Error(`Fehler: ${response.status}`);
                }

                const data = await response.json();
                setRecipes(data.hits);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query]);

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
            <Text style={styles.title}>Rezepte</Text>
            <FlatList
                data={recipes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.recipeItem}>
                        <Text>{item.recipe.label}</Text>
                    </View>
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
    recipeItem: {
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 4,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AboutPage;
