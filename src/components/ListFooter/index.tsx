import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useContexState } from '../../hooks/context';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useLoadPage } from '../../hooks/loadPage';
import { styles } from './styles';

export function ListFooter() {
    const {
        setNextPage,
        setRewindPage,
        setAutoScroll
    } = useContexState();

    const {
        isMountedApi,
        responceArray,
        textFilterNumber
    } = useContexState();

    const { LoadPage } = useLoadPage();

    return (
        <>
            {isMountedApi
                ? <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => {
                        setRewindPage(false);
                        setNextPage(true);
                        setAutoScroll(true);
                        LoadPage();
                    }}>
                        <AntDesign
                            name="caretdown"
                            style={styles.button}
                            size={24}
                            color="rgb(200,200,200)" />
                    </TouchableOpacity>
                </View> : null}

            {isMountedApi && responceArray.length === 0
                ? <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#fff',
                        paddingVertical: 50
                    }}>
                    {textFilterNumber}
                </Text> : null}

            <Text
                style={{
                    fontSize: 17,
                    color: '#fff',
                    textAlign: 'center',
                    marginTop: 10
                }}>
                Construído com {
                    <FontAwesome5
                        name="code"
                        size={15}
                        color='#26A744' />
                } e {
                    <FontAwesome5
                        name="coffee"
                        size={15}
                        color="#FFC222" />
                } por {
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            color: '#17A2B7'
                        }}>
                        Fabio Moraes
                    </Text>
                }.
            </Text>
        </>
    );
}; 