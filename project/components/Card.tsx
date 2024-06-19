import { StyleSheet, View } from 'react-native';
import {ReactNode} from "react";

type CardProps = {
    children?: ReactNode
}
export default function Card(props:CardProps){
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    );
    //children = beliebig viele React Componenten
    //? kann Kinder geben - muss aber nicht
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});