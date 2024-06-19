import {StyleSheet, View, Text, Pressable, FlatList, TouchableOpacity} from 'react-native';
import {router} from "expo-router";
import {globalStyles} from "../../styles/global";
import {useState} from "react";
import Card from "../../components/Card";

export type Review = {
    title: string,
    rating: number,
    body: string,
    key: string
}

export default function HomePage() {
    const [reviews, setReviews] = useState<Review[]>([
        { title: 'JavaScript for Beginners', rating: 5, body: 'get that shit done!', key: '1' },
        { title: 'Advanced CSS', rating: 4, body: 'New code code styles for a motivated student!', key: '2' },
        { title: 'Get work done!', rating: 3, body: 'lorem ipsum is the best text!', key: '3' },
    ]);

//data: was soll er darstellen und renderitem = wie er das ganze ausgeben soll
    return (
        <View style={styles.container}>
            <FlatList data={reviews} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => router.push({pathname:item.key, params:item})}>
                    <Card><Text style={globalStyles.titleText}>{item.title}</Text></Card>
                </TouchableOpacity>
            )} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});
