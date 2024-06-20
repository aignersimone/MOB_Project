import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useCameraPermissions, Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export default function HomePage() {
    const [facing, setFacing] = useState("back");
    const [camera, setCamera] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [objectsDetected, setObjectsDetected] = useState([]);

    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        );
    }

    useEffect(() => {
        loadModel(); // Laden des Modells beim ersten Rendern der Komponente
    }, []);

    const loadModel = async () => {
        await tf.ready(); // Warten auf die Bereitschaft von TensorFlow.js
        const model = await cocoSsd.load();
        setModel(model); // Modell setzen, um es später verwenden zu können
    };

    const flipCamera = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (camera) {
            try {
                const photo = await camera.takePictureAsync();
                console.log('Photo taken:', photo);
                setPhotoUri(photo.uri);
            } catch (error) {
                console.log('Error taking picture:', error);
            }
        } else {
            console.log('Camera ref is not ready');
        }
    };

    // const recognizeObjects = async () => {
    //     if (photoUri) {
    //         const image = document.createElement('img');
    //         image.src = photoUri;
    //         await image.decode(); // Laden Sie das Bild vollständig
    //
    //         const predictions = await model.detect(image);
    //         console.log('Predictions:', predictions);
    //         setObjectsDetected(predictions);
    //     }
    // };

    useEffect(() => {
        recognizeObjects();
    }, [photoUri]);

    const [model, setModel] = useState(null);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Screen your Ingredients</Text>
                <Camera style={styles.camera}
                        Type={facing}
                        ref={(ref) => setCamera(ref)}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={flipCamera}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
                            <View style={styles.innerButton} />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
            {photoUri && (
                <View style={styles.photoContainer}>
                    <Text style={styles.photoText}>Captured Photo:</Text>
                    <Image source={{ uri: photoUri }} style={styles.photo} />
                </View>
            )}
            {/*{objectsDetected.length > 0 && (*/}
            {/*    <View style={styles.objectsContainer}>*/}
            {/*        <Text style={styles.objectsText}>Detected Objects:</Text>*/}
            {/*        {objectsDetected.map((object, index) => (*/}
            {/*            <Text key={index} style={styles.objectItem}>*/}
            {/*                {object.class} - Confidence: {(object.score * 100).toFixed(2)}%*/}
            {/*            </Text>*/}
            {/*        ))}*/}
            {/*    </View>*/}
            {/*)}*/}
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
    text: {
        // Define styles if needed
    },
    button: {
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    photo: {
        width: 300,
        height: 400,
        resizeMode: 'contain',
    },
    objectsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    objectsText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    objectItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});
