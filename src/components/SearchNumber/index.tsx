import React, { useState, useRef } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';

import { useLoadPage } from '../../hooks/loadPage';
import { useContexState } from '../../hooks/context';

export function SearchNumber() {
    const { isMountedApi } = useContexState();
    const { LoadPage } = useLoadPage();
    
    const [value, onChangeText] = useState('Buscar');
    
    const ref = useRef<TextInput>(null);

    function FilterString(text: string) {
        if (text === text.replace(/[^0-9]/g, '')) onChangeText(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => FilterString(text)}
                value={value}
                maxLength={4}
                keyboardType={'numeric'}
                autoCorrect={false}
                placeholderTextColor='#fff'
                onFocus={() => {
                    ref.current?.clear();
                    onChangeText('');
                }}
                onBlur={() => {
                    if (value) LoadPage();
                    onChangeText('Buscar');
                }}
                ref={ref}
            />
            {isMountedApi
                ? <Entypo
                    name="magnifying-glass"
                    size={24}
                    color="rgb(220,220,220)"
                    style={styles.button}
                />
                : <ActivityIndicator
                    style={[styles.button]}
                    size={22}
                    color='#fff'
                />
            }
        </View>
    );
};