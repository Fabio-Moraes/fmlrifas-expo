import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useContexState } from '../../hooks/context';
import { useLoadPage } from '../../hooks/loadPage';

import { styles } from './styles';

interface Lines {
    firstCard: number;
    id: string;
};

export function SearchBar() {
    const { LoadPage } = useLoadPage();

    const {
        setKeyboardActive,
        setRewindPage,
        setGetList,
        setResponceArray,
        setNextPage,
        setSortNumber
    } = useContexState();

    const {
        isMountedApi,
        countAnalyzed
    } = useContexState();

    const analyzedNumber = countAnalyzed.false ? countAnalyzed.false : 0
    const paidNumber = countAnalyzed.true ? countAnalyzed.true : 0

    function ButtonAnalyzed() {
        return (
            <TouchableOpacity
                onPress={() => {
                    setGetList({});
                    setResponceArray([]);
                    setRewindPage(false);
                    setNextPage(true);
                    setSortNumber('analyzed');
                    LoadPage(0);
                }}
                style={[styles.containerButton, { backgroundColor: '#17A2B7' }]}>
                <Text
                    style={{
                        fontSize: 17,
                        color: '#fff',
                        textAlign: 'center'
                    }}>Em análise{"\n"}
                    {!isMountedApi
                        ? <ActivityIndicator
                            size={20}
                            color='#121212'
                        />
                        : analyzedNumber
                    }</Text>
            </TouchableOpacity>
        );
    };

    function ButtonPaid() {
        return (
            <TouchableOpacity
                onPress={() => {
                    setGetList({});
                    setResponceArray([]);
                    setRewindPage(false);
                    setNextPage(true);
                    setSortNumber('paid');
                    LoadPage(0);
                }}
                style={[styles.containerButton, { backgroundColor: '#26A744' }]}>
                <Text style={{ fontSize: 17, color: '#fff', textAlign: 'center' }}>Pago{"\n"}{!isMountedApi
                    ? <ActivityIndicator
                        size={20}
                        color='#121212'
                    />
                    : paidNumber
                }</Text>
            </TouchableOpacity>
        );
    };

    function ButtonFree() {
        return (
            <TouchableOpacity style={[styles.containerButton, { backgroundColor: '#fff' }]}>
                <Text style={{ fontSize: 17, color: '#121212', textAlign: 'center' }}>Livre{"\n"}
                    {!isMountedApi
                        ? <ActivityIndicator
                            size={20}
                            color='#121212'
                        />
                        : 10000 - (analyzedNumber + paidNumber)
                    }</Text>
            </TouchableOpacity>
        );
    };

    function ButtonSearch() {
        return (
            <TouchableOpacity onPress={() => { isMountedApi && setKeyboardActive(true) }} style={[styles.containerButton, { backgroundColor: 'gray', }]}>
                <Text style={{ fontSize: 17, color: '#fff' }}>Buscar</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ButtonFree />
            <ButtonAnalyzed />
            <ButtonPaid />
            <ButtonSearch />
        </View>
    );
};