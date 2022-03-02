import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, ActivityIndicator } from 'react-native';

import { useContexState } from '../../../hooks/context';
import { useLoadPage } from '../../../hooks/loadPage';
import { styles } from './styles';

import api from '../../../services/api';

export function ShoppingCart() {
    const {
        setShoppingCartItem,
        setShoppingCartActive,
        setRegisterMenuActive,
    } = useContexState();
    
    const {
        shoppingCartItem,
        shoppingCartActive,
        loginValue,
        getList
    } = useContexState();

    const { LoadPage } = useLoadPage();

    const [numberSelectDelete, setNumberSelectDelete] = useState<number[]>([]);

    const keyExtractor = useCallback(
        (item) => item.id.toString(), []
    );

    const conta = (shoppingCartItem.length - numberSelectDelete.length) * 19.90;
    const price = (conta).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const result = []
    for (let i = 0; i < shoppingCartItem.length; i++) {
        result.push({ id: i, number: shoppingCartItem[i] });
    };

    function colorSelect(number: number) {
        const responceCard = getList[number]?.[0];

        if (responceCard) {
            if (responceCard.name === 'Number added to cart'
                && loginValue.permission === 'adm') {
                return {
                    backgroundColor: '#F4A900',
                    color: '#fff'
                };
            };

            if (responceCard.status === 'analyzed') {
                return {
                    backgroundColor: '#17A2B7',
                    color: '#fff'
                };
            };

            if (responceCard.status === 'paid') {
                return {
                    backgroundColor: '#26A744',
                    color: '#fff'
                };
            };

        };
    };

    function RejectCards() {
        function RejectData(i: number) {
            api.get("rejectCard", {
                params: {
                    number: shoppingCartItem[i],
                    name: loginValue.name,
                    password: loginValue.password
                }
            }).then((responce) => {
                if (i + 1 === shoppingCartItem.length) {
                    setShoppingCartActive(false);
                    LoadPage();
                    setShoppingCartItem([]);
                };
                console.log(responce.data);
            });
        };

        for (let i = 0; i < shoppingCartItem.length; i++) {
            RejectData(i);
            console.log(`PayOk ${shoppingCartItem[i]}`);
        };
    };

    function ApproveCards() {
        function ApproveData(i: number) {
            api.put("approveCard", {
                    number: shoppingCartItem[i],
                    name: loginValue.name,
                    password: loginValue.password
              
            }).then((responce) => {
                if (i + 1 === shoppingCartItem.length) {
                    setShoppingCartActive(false);
                    LoadPage();
                    setShoppingCartItem([]);
                };
            });
        };

        for (let i = 0; i < shoppingCartItem.length; i++) {
            ApproveData(i);
            console.log(`PayOk ${shoppingCartItem[i]}`);
        };
    };

    function ApplyDeletion() {
        const temp = [...shoppingCartItem];

        function deleteData(number: number) {
            if (loginValue.permission !== 'adm') {
                api.put("deleteBuy", { number }).then();
            };
        };

        numberSelectDelete.map(i => {
            let indice = temp.indexOf(i);
            if (shoppingCartItem[indice]) {
                while (indice >= 0) {
                    deleteData(i);
                    temp.splice(indice, 1);
                    indice = temp.indexOf(i);
                };
                setShoppingCartItem(temp);
                setNumberSelectDelete([]);
                LoadPage();
            };
        });
    };

    function SelectDelete(number: number) {
        const temp = [...numberSelectDelete];
        const buscar = number;
        let indice = temp.indexOf(buscar);

        if (numberSelectDelete[indice]) {
            while (indice >= 0) {
                temp.splice(indice, 1);
                indice = temp.indexOf(buscar);
            };
            setNumberSelectDelete(temp);
        } else {
            setNumberSelectDelete([...temp, number]);
        };
    };

    function Card({ number }: { number: number }) {
        const temp = [...numberSelectDelete];
        const buscar = number;
        let indice = temp.indexOf(buscar);
        return (
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => SelectDelete(number)}>
                <Text style={[styles.listText, numberSelectDelete[indice] ? { backgroundColor: '#E22222', color: '#fff' } : colorSelect(number)]}>
                    {(`0000${number}`).slice(-4)}
                </Text>
            </TouchableOpacity>
        );
    };

    function CartHeader() {
        const value = shoppingCartItem.length - numberSelectDelete.length

        if (value > 1) {
            return <>
                <Text style={{ fontSize: 40 }}>{value}</Text>
                <Text>{"\n"}NÚMEROS POR APENAS{"\n"} </Text>
                <Text style={{ fontSize: 25 }}>R$ {price}</Text>
            </>
        }

        if (value === 1) {
            return <>
                <Text style={{ fontSize: 40 }}>{value}</Text>
                <Text>{"\n"}NÚMERO POR APENAS{"\n"}</Text>
                <Text style={{ fontSize: 25 }}>R$ {price}</Text>
            </>
        }
        return <Text>{"\n"}O CARRINHO SERÁ ESVAZIADO!{"\n"}</Text>
    }

    return (shoppingCartActive ? <>
        <TouchableOpacity onPress={() => {
            setShoppingCartActive(false);
        }} style={styles.containeMain} />

        <View style={styles.container} >
            <Text style={styles.priceHeader}>
                {loginValue.permission !== 'adm'
                    ? <CartHeader />
                    : <Text style={{ fontSize: 15 }}>{'CARRINHO DO ADMINISTRADOR'}</Text>}
            </Text>

            <FlatList
                data={result}
                keyExtractor={keyExtractor}
                numColumns={4}
                renderItem={({ item }) => <Card number={item.number} />}
            />


            {numberSelectDelete.length > 0
                ? <TouchableOpacity
                    style={[styles.buttonPay, { backgroundColor: '#E22222' }]}
                    onPress={() => {
                        if (shoppingCartItem.length === numberSelectDelete.length) {
                            setShoppingCartActive(false);
                        };
                        ApplyDeletion();
                    }} >
                    <Text style={styles.payText}>Remover</Text>
                </TouchableOpacity>
                : (loginValue.permission === 'adm' ? (
                    <>
                        {
                            shoppingCartItem.filter((item) => {
                                return getList[item]?.[0].name === 'Number added to cart'
                            }).length > 0 && shoppingCartItem.filter((item) => {
                                return getList[item]?.[0].name !== 'Number added to cart'
                            }).length === 0 ? (
                                <TouchableOpacity
                                    style={[styles.buttonPay, {
                                        marginBottom: 0,
                                        backgroundColor: '#F4A900'
                                    }]}
                                    onPress={() => {
                                        setRegisterMenuActive(true);
                                        setShoppingCartActive(false);
                                    }} >
                                    <Text style={styles.payText}>Validar</Text>
                                </TouchableOpacity>
                            ) : null
                        }

                        {
                            shoppingCartItem.filter((item) => {
                                return getList[item]?.[0].status === 'analyzed'
                            }).length > 0 && shoppingCartItem.filter((item) => {
                                return getList[item]?.[0].status !== 'analyzed'
                            }).length === 0 && shoppingCartItem.filter((item) => {
                                return getList[item]?.[0].name === 'Number added to cart'
                            }).length === 0 ? (
                                <TouchableOpacity
                                    style={[styles.buttonPay, {
                                        marginBottom: 0,
                                        backgroundColor: '#17A2B7'
                                    }]}
                                    onPress={() => ApproveCards()} >
                                    <Text style={styles.payText}>Aprovar</Text>
                                </TouchableOpacity>
                            ) : null
                        }

                        <TouchableOpacity
                            style={[styles.buttonPay, {
                                backgroundColor: 'gray'
                            }]}
                            onPress={() => { RejectCards() }} >
                            <Text style={styles.payText}>Rejeitar</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={[styles.buttonPay, { backgroundColor: '#26A744' }]}
                        onPress={() => {
                            setRegisterMenuActive(true);
                            setShoppingCartActive(false);
                        }} >
                        <Text style={styles.payText}>Comprar</Text>
                    </TouchableOpacity>
                ))}
        </View>
    </> : null
    );
};