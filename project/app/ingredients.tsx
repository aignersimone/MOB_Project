import {ScrollView, Text, StyleSheet} from "react-native";
import ClarifaiModel from "../components/ClarifaiModel";

export default function IngredientsPage(){
    return (
        <ScrollView>
            <Text style={styles.header}>Our smart recipe finder</Text>
            <Text style={styles.info}>Photograph your food individually and you will be shown a recipe of what you can make from the food</Text>
            <ClarifaiModel />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    info:{
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    header:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});