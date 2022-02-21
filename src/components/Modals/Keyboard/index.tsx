import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

import { useContexState } from '../../../hooks/context';
import { useLoadPage } from '../../../hooks/loadPage';
import { styles } from './styles';

export function Keyboard() {
    const { LoadPage } = useLoadPage();
    const { keyboardActive, setKeyboardActive, setSortNumber } = useContexState();
    const [resultNumber, setResultNumber] = useState<string>('');

    function ButtonClean() {
        function OnPress() {
            if (resultNumber !== '') {
                setResultNumber(resultNumber.substring(0, resultNumber.length - 1));
            } else {
                setKeyboardActive(false);
            }
        }

        return (
            <TouchableOpacity style={styles.buttonLimpar} onPress={OnPress}>
                <Text style={styles.textButtonLimpar}>Limpar</Text>
            </TouchableOpacity>
        )
    }

    function ButtonAddNumber({ number }: { number: string }) {
        function OnPress() {
            if (resultNumber === '' && number === '0') return null
            if (resultNumber.length < 4) return setResultNumber(resultNumber + number);
        };

        return (
            <TouchableOpacity onPress={OnPress}>
                <Text style={styles.textNumber}>{number}</Text>
            </TouchableOpacity>
        );
    };

    function ButtonFinishing() {
        return (
            <TouchableOpacity onPress={() => {
                setSortNumber('default');
                setKeyboardActive(false);
                setResultNumber('');
                LoadPage(Number(resultNumber));
            }} style={styles.buttonConcluir}>
                <Text style={styles.textButtonConcluir}>Concluir</Text>
            </TouchableOpacity>
        )
    }

    return (keyboardActive ? <>
        <TouchableOpacity onPress={() => {
            setResultNumber('');
            setKeyboardActive(false);
        }} style={styles.containeMain} />

        <View style={styles.container} >
            <TouchableOpacity activeOpacity={1} style={styles.containerResultNumber}>
                <Text style={[styles.listText]}>
                    {(`0000${resultNumber}`).slice(-4)}
                </Text>
            </TouchableOpacity>

            <View style={styles.containerNumber}>
                <ButtonAddNumber number={'1'} />
                <ButtonAddNumber number={'2'} />
                <ButtonAddNumber number={'3'} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <ButtonAddNumber number={'4'} />
                <ButtonAddNumber number={'5'} />
                <ButtonAddNumber number={'6'} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <ButtonAddNumber number={'7'} />
                <ButtonAddNumber number={'8'} />
                <ButtonAddNumber number={'9'} />
            </View>

            <View style={styles.containerButton}>
                <ButtonClean />
                <ButtonAddNumber number={'0'} />
                <ButtonFinishing />
            </View>

        </View >
    </> : null
    );
};