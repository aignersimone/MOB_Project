// Detailseite (RecipeDetail)
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

export default function RecipeDetail() {
    const route = useRoute();
    const { recipe } = route.params;
   // console.log(route.params.id);

    return (
        <View style={styles.container}>
            <Text>Hallo</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});