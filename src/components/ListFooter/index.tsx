import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useContexState } from '../../hooks/context';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { useLoadPage } from '../../hooks/loadPage';
import { styles } from './styles';

export function ListFooter() {
    const { LoadPage } = useLoadPage();

    const {
        setNextPage,
        setRewindPage
    } = useContexState();

    const {
        listData,
        perPage,
        isMountedApi,
        sortNumber,
        responceArray,
        textFilterNumber
    } = useContexState();

    const OnpressButton = () => {
        if (sortNumber !== 'default') {
            setRewindPage(false);
            setNextPage(true);
            LoadPage(0);

        } else {
            LoadPage(Number(listData[perPage - 1]?.firstCard + 1));
        };
    };

    return (
        <>
            {listData[perPage - 1]?.firstCard < 9999 && isMountedApi
                ? <View style={styles.containerButton}>
                    <TouchableOpacity onPress={OnpressButton}>
                        <AntDesign
                            name="caretdown"
                            style={styles.button}
                            size={24}
                            color="rgb(200,200,200)" />
                    </TouchableOpacity>
                </View> : null}

            {sortNumber !== 'default' && responceArray.length === 0 && isMountedApi
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