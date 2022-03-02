import React, { useState } from 'react';
import {
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
        status: string;
        dealer: string;
        coupon: string
        price: number;
        data_time: string;
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
            status: string;
            dealer: string;
            coupon: string
            price: number;
            data_time: string;
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


        if (responceCard?.name === 'Number added to cart'
            && loginValue.permission === 'adm') {
            return {
                backgroundColor: '#F4A900',
                color: '#fff'
            };
        };

        if (responceCard?.status === 'analyzed') {
            return {
                backgroundColor: '#17A2B7',
                color: '#fff'
            };
        };

        if (responceCard?.status === 'paid') {
            return {
                backgroundColor: '#26A744',
                color: '#fff'
            };
        };
    };

    function AlertMessageSelect() {
        if (shoppingCartItem[index]) {
            return 'O número já está no carrinho!';
        };

        if (responceCard?.status === 'analyzed') {
            return 'O número está em análise!';
        };

        if (responceCard?.status === 'paid') {
            return `O número já foi comprado por\n"${responceCard?.name}"`;
        };

        if (responceCard?.status === 'empty' && loginValue.permission === 'adm') {
            return 'Não é possível fazer compras através de uma conta administrativa!';
        };

        return '';
    };

    function PaidCheck() {
        setCheckBuyLoad(true);
        function ResponceClick(responce: response) {
            setCheckBuyLoad(false);

            if (loginValue.permission === 'adm') {
                if (responceCard?.status !== 'empty') {
                    setPaymentMenuActive(true);
                    setSelectedNumber(cardNumber);
                } else {
                    setAlertActive(true);
                    setAlertMessage(AlertMessageSelect());
                };
            } else {
                if (responceCard?.status === 'empty') {
                    setPaymentMenuActive(true);
                    setSelectedNumber(cardNumber);
                } else {
                    setAlertActive(true);
                    setAlertMessage(AlertMessageSelect());
                };
            };

            if (responce.data[0].status !== responceCard?.status) {
                LoadPage();
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
        return (
            <TouchableOpacity
                onPress={() => isMountedApi ? PaidCheck() : null}
                style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {(`0000${cardNumber}`).slice(-4) !== 'ined' ? <Text
                    style={[styles.listText, colorSelect()]}>
                    {(`0000${cardNumber}`).slice(-4)}
                </Text> : null}
                {!isMountedApi || checkBuyLoad ?
                    <ActivityIndicator
                        style={{ position: 'absolute' }}
                        size={20}
                        color='#121212'
                    /> : null}
            </TouchableOpacity>
        );
    };

    return <ButtonCard />;
};