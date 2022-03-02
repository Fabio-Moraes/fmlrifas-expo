import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useContexState } from '../../hooks/context';
import { useLoadPage } from '../../hooks/loadPage';

import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export function SearchBar() {
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

    const { LoadPage } = useLoadPage();

    const analyzedNumber = countAnalyzed.analyzed ? countAnalyzed.analyzed : 0
    const paidNumber = countAnalyzed.paid ? countAnalyzed.paid : 0

    function ButtonHome() {
        return (
            <TouchableOpacity
                onPress={() => {
                    setGetList({});
                    setResponceArray([]);
                    setRewindPage(false);
                    setNextPage(true);
                    setSortNumber('default');
                    LoadPage();
                }}
                style={[styles.containerButton, { backgroundColor: '#fff' }]}>
                <Text style={[styles.textButtoun, { color: '#121212' }]}>
                    <AntDesign name="home" size={27} color="black" /></Text>
            </TouchableOpacity>
        );
    };

    function ButtonFree() {
        return (
            <TouchableOpacity
                onPress={() => {
                    setGetList({});
                    setResponceArray([]);
                    setRewindPage(false);
                    setNextPage(true);
                    setSortNumber('empty');
                    LoadPage();
                }}
                style={[styles.containerButton, { backgroundColor: '#fff' }]}>
                <Text style={[styles.textButtoun, { color: '#121212' }]}>Livre{"\n"}
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

    function ButtonAnalyzed() {
        return (
            <TouchableOpacity
                onPress={() => {
                    setGetList({});
                    setResponceArray([]);
                    setRewindPage(false);
                    setNextPage(true);
                    setSortNumber('analyzed');
                    LoadPage();
                }}
                style={[styles.containerButton, { backgroundColor: '#17A2B7' }]}>
                <Text
                    style={styles.textButtoun}>Em análise{"\n"}
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
                    LoadPage();
                }}
                style={[styles.containerButton, { backgroundColor: '#26A744' }]}>
                <Text style={styles.textButtoun}>Pago{"\n"}{!isMountedApi
                    ? <ActivityIndicator
                        size={20}
                        color='#121212'
                    />
                    : paidNumber
                }</Text>
            </TouchableOpacity>
        );
    };

    function ButtonSearch() {
        return (
            <TouchableOpacity
                onPress={() => {
                    isMountedApi && setKeyboardActive(true)
                }} style={[styles.containerButton, { backgroundColor: '#fff' }]}>
                <Text style={[styles.textButtoun, { color: '#121212' }]}>
                    <AntDesign name="search1" size={27} color="black" />
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ButtonHome />
            <ButtonFree />
            <ButtonAnalyzed />
            <ButtonPaid />
            <ButtonSearch />
        </View>
    );
};