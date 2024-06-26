import {Image, StyleSheet, Text, ScrollView, View} from 'react-native';

export default function HomePage() {

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.title}>About IngredientOra</Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
    },
    camera: {
        flex: 1,
        height: 500,
    },
    text:{

    },
    button:{
        marginLeft: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    cameraButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    photoContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    photo: {
        width: 300,
        height: 400,
        resizeMode: 'contain',
    },
});
