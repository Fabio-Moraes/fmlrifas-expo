import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { useContexState } from '../../../hooks/context';
import { styles } from './styles';

import api from '../../../services/api';
import { useLoadPage } from '../../../hooks/loadPage';

export function PaymentMenu() {
    const {
        setShoppingCartItem,
        setPaymentMenuActive,
        setRegisterMenuActive,
        setAlertActive,
        setAlertMessage
    } = useContexState();

    const {
        shoppingCartItem,
        selectedNumber,
        paymentMenuActive,
        loginValue,
        getList
    } = useContexState();

    const { LoadPage } = useLoadPage();

    const [load, setLoad] = useState(false);
    const [loadMessage, setLoadMessage] = useState('')

    const responceCard = getList[String(selectedNumber)]?.[0];

    function LoadPopUp() {
        return (
            <>
                <Text style={styles.textLoadPopUp}>{loadMessage}</Text>
                <ActivityIndicator
                    size={37}
                    color='#fff'
                    style={styles.ActivityIndicator}
                />
            </>
        );
    };

    function ApproveCard() {
        setLoadMessage('Aprovando número!');
        setLoad(true);

        api.put("approveCard", {
            number: selectedNumber,
            name: loginValue.name,
            password: loginValue.password
        }).then((Responce) => {
            setPaymentMenuActive(false);
            LoadPage();
            setLoad(false);
        });
    };

    function RejectCard() {
        setLoadMessage('Rejeitando número!');
        setLoad(true);

        api.get("rejectCard", {
            params: {
                number: selectedNumber,
                name: loginValue.name,
                password: loginValue.password
            }
        }).then((responce) => {
            LoadPage();
            setPaymentMenuActive(false);
            setLoad(false);
        });
    };

    function AddToCart(message: string) {
        setLoadMessage(message);
        setLoad(true);
        if (loginValue.permission === 'adm') {
            setShoppingCartItem([...shoppingCartItem, Number(selectedNumber)]);
            setLoad(false);
            setPaymentMenuActive(false);
        } else {
            api.put("registerBuy", {
                number: selectedNumber,
            }).then((response) => {
                if (message === 'Preparando o seu número!') {
                    setRegisterMenuActive(true);
                };
                setLoad(false);
                setPaymentMenuActive(false);
                setShoppingCartItem([...shoppingCartItem, Number(selectedNumber)]);

            });
        };
    };

    function AlertMessageAbout() {
        const analyzed = responceCard.status === 'paid' ? 'Aprovado' : 'Em análise';

        if (responceCard.name === 'Number added to cart') {
            return (`\n> Situação <|\nO número consta como no carrinho!
            \n> Momento <\n${responceCard.data_time}`);
        };

        return (
            <Text style={{ fontSize: 20 }}>
                <View style={styles.listTextComponent}>Nome{'\n'}{responceCard.name}</View>
                {'\n'} <View style={styles.listTextComponent}>Telefone{'\n'}{responceCard.phone}</View>
                {'\n'} <View style={styles.listTextComponent}>Situação{'\n'}{analyzed}</View>
                {'\n'} <View style={styles.listTextComponent}>Revendedor{'\n'}{'Nenhum'}</View>
                {'\n'} <View style={styles.listTextComponent}>Momento{'\n'}{responceCard.data_time}</View>
                {'\n'} <View style={styles.listTextComponent}>Preço{'\n'}{'R$ 19,90'}</View>
            </ Text >);
    };

    function Menu() {
        function ValidateButton() {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setPaymentMenuActive(false);
                        setRegisterMenuActive(true);
                        setShoppingCartItem([...shoppingCartItem, Number(selectedNumber)]);
                    }}
                    style={[styles.containerButtonPurchase, {
                        backgroundColor: '#F4A900',
                        marginBottom: 10
                    }]} >
                    <Text style={styles.textButtonPurchase}>Validar</Text>
                </TouchableOpacity>
            );
        };

        function ApproveButton() {
            return (
                <TouchableOpacity
                    onPress={() => ApproveCard()}
                    style={[styles.containerButtonPurchase, {
                        backgroundColor: '#17A2B7',
                        marginBottom: 10
                    }]} >
                    <Text style={styles.textButtonPurchase}>Aprovar</Text>
                </TouchableOpacity>
            );
        };

        function AboutButton() {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setAlertActive(true);
                        setAlertMessage(AlertMessageAbout());
                    }}
                    style={[styles.containerButtonPurchase, {
                        backgroundColor: '#6C7A86',
                        marginBottom: 10
                    }]} >
                    <Text style={styles.textButtonPurchase}>Sobre</Text>
                </TouchableOpacity>
            );
        };

        function RejectButton() {
            return (
                <TouchableOpacity
                    onPress={() => RejectCard()}
                    style={[styles.containerButtonPurchase, {
                        backgroundColor: '#FF6961'
                    }]} >
                    <Text style={styles.textButtonPurchase}>Rejeitar</Text>
                </TouchableOpacity>
            );
        };

        function BuyButton() {
            return (
                <TouchableOpacity
                    onPress={() => AddToCart('Preparando o seu número!')}
                    style={[styles.containerButtonPurchase, {
                        backgroundColor: '#26A744'
                    }]} >
                    <Text style={styles.textButtonPurchase}>Comprar</Text>
                </TouchableOpacity>
            );
        };

        function AddCartButton() {
            return (
                <TouchableOpacity
                    onPress={() => AddToCart('Adicionando ao carrinho!')}
                    style={styles.containerButtonAddCart} >
                    <Text style={styles.textButtonAddCart}>Adicionar ao {'\n'}carrinho</Text>
                </TouchableOpacity>
            );
        };

        function SelectMenuUser() {
            if (loginValue.permission === 'adm') {
                return (
                    <>
                        <AboutButton />
                        {responceCard.status === 'analyzed' ? (
                            responceCard.name === 'Number added to cart'
                                ? <ValidateButton />
                                : <ApproveButton />
                        ) : null}
                        <RejectButton />
                    </>
                );
            } else return <BuyButton />;
        };
        return (
            <>
                <SelectMenuUser />
                <AddCartButton />
            </>
        );
    };

    return paymentMenuActive ? (
        <>
            <TouchableOpacity onPress={() => {
                setPaymentMenuActive(false);
            }} style={styles.containeMain} />

            <View style={styles.container} >
                <Text style={[styles.listText]}>{
                    (`0000${selectedNumber}`).slice(-4)
                }</Text>
                {load ? <LoadPopUp /> : <Menu />}
            </View>
        </>
    ) : null;
};