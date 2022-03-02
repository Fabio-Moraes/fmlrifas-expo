import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useLoadPage } from '../../hooks/loadPage';
import { useContexState } from '../../hooks/context';

import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export function ListHeader() {
    const {
        setRewindPage,
        setNextPage
    } = useContexState();
    
    const { 
        isMountedApi 
    } = useContexState();
    
    const { LoadPage } = useLoadPage();

    function Price() {
        return (
            <View style={styles.containerPrice}>
                <Text style={styles.textPrice}>{`POR APENAS${"\n"}R$ 19,90`}</Text>
            </View>
        );
    };

    function Description() {
        return (
            <Text style={styles.description}>
                Esse sonho pode ser seu por apenas 19,90 venha agora ser feliz,
                Essa máquina e Inspirado no espírito de customização dos Café Racers
                e equipado com a mais alta tecnologia, a CB 650R atrai olhares por
                onde passa.</Text>
        );
    };

    function Button() {
        if (isMountedApi) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setRewindPage(true);
                        setNextPage(false);
                        LoadPage();
                    }}
                    style={{ alignItems: 'center' }}>
                    <AntDesign
                        name="caretup"
                        size={24}
                        style={styles.button}
                        color="rgb(200,200,200)" />
                </TouchableOpacity>
            );
        };
        return null
    };

    return <>
        <Price />
        <Description />
        <Button />
    </>
};