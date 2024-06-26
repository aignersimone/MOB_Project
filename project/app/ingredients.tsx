import React, { useState, useEffect } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native';
import { useCameraPermissions} from 'expo-camera';
import {Camera} from "expo-camera/legacy";

export default function HomePage() {
    const [facing, setFacing] = useState('back');
    const [camera, setCamera] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();

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

    function flipCamera() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

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

    return (
        <ScrollView >
            <View style={styles.container}>
            <Text style={styles.title}>Screen your Ingredients</Text>
            <Camera style={styles.camera}
                         type={facing}
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
        padding: 8,
    },
});
