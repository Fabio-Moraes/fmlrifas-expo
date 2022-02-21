import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { useContexState } from '../../hooks/context';
import { useLoadPage } from '../../hooks/loadPage';
import { styles } from './styles';

import api from '../../services/api';

interface response {
    data: {
        id: number;
        number: number;
        name: string;
        phone: string;
        price: number;
        analyzed: number;
    }[]
};


interface ListItemProps {
    data: {
        firstCard: number,
        id: string
    };
    list?: {
        [key: string]: [{
            id: number;
            name: string;
            phone: string;
            price: number;
            analyzed: number
        }]
    };
};


export function ListItem(listItemProps: ListItemProps) {
    const { LoadPage } = useLoadPage();

    const {
        setSelectedNumber,
        setAlertActive,
        setPaymentMenuActive,
        setAlertMessage
    } = useContexState();

    const {
        isMountedApi,
        shoppingCartItem,
        listData,
        getList,
        loginValue
    } = useContexState();

    const [checkBuyLoad, setCheckBuyLoad] = useState(false)
    const cardNumber = listItemProps.data.firstCard; "+ position"
    const responceCard = listItemProps.list?.[cardNumber]?.[0];

    const tempShoppingCartItem = [...shoppingCartItem];
    const index = tempShoppingCartItem.indexOf(cardNumber);

    function colorSelect() {
        if (shoppingCartItem[index]) {
            return {
                backgroundColor: '#7B68EE',
                color: '#fff'
            };
        };

        if (responceCard) {
            if (responceCard.name === 'Number added to cart'
                && loginValue.permission === 'adm') {
                return {
                    backgroundColor: '#F4A900',
                    color: '#fff'
                };
            };

            if (responceCard.analyzed === 0) {
                return {
                    backgroundColor: '#17A2B7',
                    color: '#fff'
                };
            };

            if (responceCard.analyzed === 1) {
                return {
                    backgroundColor: '#26A744',
                    color: '#fff'
                };
            };

        };
    };

    function AlertMessageSelect() {
        if (shoppingCartItem[index]) {
            return 'O número já está no carrinho!';
        };

        if (responceCard?.analyzed === 0) {
            return 'O número está em análise!';
        };

        if (responceCard?.analyzed === 1) {
            return 'O número já foi comprado!';
        };

        if (!responceCard) {
            return 'Não é possível fazer compras através de uma conta administrativa!';
        }
        return '';
    };

    function PaidCheck() {
        setCheckBuyLoad(true);
        function ResponceClick(responce: response) {
            setCheckBuyLoad(false)
            if (!responceCard && responce?.data.length === 0) {
                if (loginValue.permission !== 'adm') {
                    setPaymentMenuActive(true);
                    setSelectedNumber(cardNumber);
                } else {
                    setAlertActive(true);
                    setAlertMessage(AlertMessageSelect());
                }
            } else if (responceCard && responce?.data.length !== 0) {
                if (loginValue.permission === 'adm') {
                    setPaymentMenuActive(true);
                    setSelectedNumber(cardNumber);
                } else {
                    setAlertActive(true);
                    setAlertMessage(AlertMessageSelect());
                }
            };

            if (responceCard && responce.data.length === 0) {
                LoadPage(Number(listData[0]?.firstCard));
            } else if (!responceCard && responce.data.length !== 0) {
                LoadPage(Number(listData[0]?.firstCard));
            };
        };

        api.get("getCards", {
            params: {
                firstNumber: cardNumber,
                lastNumber: cardNumber,
            }
        }).then(ResponceClick);
    };

    function ButtonCard() {
        return cardNumber <= 9999 && cardNumber >= 0 ? (
            <TouchableOpacity
                onPress={() => isMountedApi ? PaidCheck() : null}
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text
                    style={[styles.listText, colorSelect()]}>
                    {(`0000${cardNumber}`).slice(-4)}
                </Text>
                {!isMountedApi || checkBuyLoad ?
                    <ActivityIndicator
                        style={{ position: 'absolute' }}
                        size={20}
                        color='#121212'
                    /> : null}
            </TouchableOpacity>
        ) : null
    };

    return <ButtonCard />;
};