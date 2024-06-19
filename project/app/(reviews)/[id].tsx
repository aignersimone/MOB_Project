import { StyleSheet, View, Text } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import Card from "../../components/Card";


export default function PreviewDetail() {
 let item= useLocalSearchParams(); //Der lest die Items raus

 return (
     <Card>
         <Text>{item.title }</Text>
         <Text>{item.body }</Text>
         <Text>Rating: {item.rating }/10</Text>
     </Card>
 );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
});
