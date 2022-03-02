import React, { useState, useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

import { styles } from './styles'

export function SliderImage() {
    const [countImage1, setCountImage1] = useState(0);
    const [countImage2, setCountImage2] = useState(0);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;

    function Slider() {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
        } as Animated.TimingAnimationConfig).start(() => {
            setCountImage2(countImage2 < 7 ? countImage2 + 1 : 0)
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 5000,
            } as Animated.TimingAnimationConfig).start(() => {
                setCountImage1(countImage1 < 7 ? countImage1 + 1 : 0)
            });
        });
    };

    useEffect(() => Slider(), [countImage1]);

    return (
        <View style={styles.container}>
            <View style={styles.containerBlurImagen}>
                <Animated.Image
                    blurRadius={3}
                    style={[styles.blurImagen]}
                    source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/fmlrifas.appspot.com/o/Honda_CB_650_${countImage2}.jpg?alt=media&token=089902ff-82c4-4b14-a8c4-0eb0b56d6d7a`,
                    }}
                />
                <Animated.Image
                    blurRadius={3}
                    style={[styles.blurImagen, { opacity: fadeAnim }]}
                    source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/fmlrifas.appspot.com/o/Honda_CB_650_${countImage1}.jpg?alt=media&token=089902ff-82c4-4b14-a8c4-0eb0b56d6d7a`,
                    }}
                />

                <View style={styles.containerFadingText}>
                    <Text style={styles.fadingText}>CB 650R Neo Sports Café</Text>
                </View>
            </View>

            <Animated.Image
                style={[styles.imagen]}
                source={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/fmlrifas.appspot.com/o/Honda_CB_650_${countImage2}.jpg?alt=media&token=089902ff-82c4-4b14-a8c4-0eb0b56d6d7a`,
                }} />
            <Animated.Image
                style={[styles.imagen, { opacity: fadeAnim }]}
                source={{
                    uri: `https://firebasestorage.googleapis.com/v0/b/fmlrifas.appspot.com/o/Honda_CB_650_${countImage1}.jpg?alt=media&token=089902ff-82c4-4b14-a8c4-0eb0b56d6d7a`,
                }} />
        </View>
    );
};