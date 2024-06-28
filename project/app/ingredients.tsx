import {ScrollView, Text, StyleSheet} from "react-native";
import ClarifaiModel from "../components/ClarifaiModel";

export default function IngredientsPage(){
    //RZutatenseite mit dem ClarifaiModel laden und retournieren
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Our smart recipe finder</Text>
            <Text style={styles.info}>Photograph your food individually and you will be shown a recipe of what you can make from the food</Text>
            <ClarifaiModel />
        </ScrollView>
    )
}

//Styling definieren
const styles = StyleSheet.create({
    info:{
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: "KalamBold",
        marginBottom: 16,
        alignSelf: "center"
    },
    container: {
        flex: 1,
        padding: 24,
    },
});