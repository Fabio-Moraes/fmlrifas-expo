import React, { useState, useRef } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    TextInputProps,
    ActivityIndicator
} from 'react-native';

import { useLoadPage } from '../../../hooks/loadPage'
import { useContexState } from '../../../hooks/context';
import { styles } from './styles';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type YourNavigatorProps = NativeStackNavigationProp<ParamListBase, keyof ParamListBase>

import api from '../../../services/api';

export function RegisterMenu() {
    const {
        setRegisterMenuActive,
        setShoppingCartItem,
    } = useContexState();

    const {
        shoppingCartItem,
        registerMenuActive,
        loginValue,
    } = useContexState();

    const { LoadPage } = useLoadPage();

    const [alertCancelPurchaseActive, setAlertCancelPurchaseActive] = useState(false)
    const [loadFinishing, setLoadFinishing] = useState(false);
    const navigation = useNavigation<YourNavigatorProps>();

    const conta = (shoppingCartItem.length) * 19.90;
    const price = (conta).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const inputName = useRef('');
    const inputDDD = useRef('');
    const inputTelePhone = useRef('');

    function InputName({ style }: TextInputProps) {
        const [syntaxError, setSyntaxerror] = useState(false);

        function FilterNumber(text: string) {
            if (text === text.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, "")) {
                setSyntaxerror(false);
                inputName.current = text;
            } else {
                setSyntaxerror(true);
                inputName.current = '';
            };
        };

        return (
            <TextInput
                style={[styles.input, style, syntaxError ? { color: '#E22222' } : null]}
                onChangeText={text => FilterNumber(text)}
                maxLength={40}
                autoCorrect={false}
                spellCheck={false}
            />

        );
    };

    function InputTelePhone({ style }: TextInputProps) {
        const [syntaxError, setSyntaxerror] = useState(false);

        function FilterNumber(text: string) {
            if (text === text.replace(/[^0-9]/g, '')) {
                setSyntaxerror(false);
                inputTelePhone.current = text;
            } else {
                setSyntaxerror(true);
                inputTelePhone.current = '';
            };
        };
        return (
            <TextInput
                style={[styles.input, style, syntaxError ? { color: '#E22222' } : null]}
                onChangeText={text => FilterNumber(text)}
                maxLength={9}
                keyboardType={'numeric'}
                autoCorrect={false}
                spellCheck={false}
            />
        );
    };

    function InputDDD({ style }: TextInputProps) {
        const [syntaxError, setSyntaxerror] = useState(false);

        function FilterNumber(text: string) {
            if (text === text.replace(/[^0-9]/g, '')) {
                setSyntaxerror(false);
                inputDDD.current = text;
            } else {
                setSyntaxerror(true);
                inputDDD.current = '';
            };
        };

        return (
            <TextInput
                style={[styles.input, style, syntaxError ? { color: '#E22222' } : null]}
                onChangeText={text => FilterNumber(text)}
                maxLength={3}
                keyboardType={'numeric'}
                autoCorrect={false}
                spellCheck={false}
            />

        );
    };

    function Load() {
        return (
            <>
                <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center', marginHorizontal: 10 }}>Finalizando compra!</Text>
                <ActivityIndicator size={37} color='#fff' style={{ marginTop: 10, marginBottom: 20 }} />
            </>
        );
    }

    function ButtonBuy() {
        function UpdateData(i: number) {
            setLoadFinishing(true);
            api.put("updateBuy", {
                number: shoppingCartItem[i],
                name: inputName.current,
                phone: `(${inputDDD.current})${inputTelePhone.current}`,
            }).then((response) => {
                if (i + 1 === shoppingCartItem.length) {
                    if (loginValue.permission === 'adm') {
                        setShoppingCartItem([]);
                        LoadPage();
                    } else {
                        navigation.navigate('Checkout');
                        LoadPage();
                    };
                };
                setRegisterMenuActive(false);
                setLoadFinishing(false);
            });
        };

        if (inputName.current !== '' && inputTelePhone.current !== '' && inputDDD.current !== '') {
            for (let i = 0; i < shoppingCartItem.length; i++) {
                UpdateData(i);
                console.log(`PayOk ${shoppingCartItem[i]}`);
            };
        };
    };

    function ButtonCancelBuy() {
        function deleteData(i: number) {
            setLoadFinishing(true);
            api.put("deleteBuy", { number: shoppingCartItem[i] }).then((response) => {
                setLoadFinishing(false);
            });
        };

        if (loginValue.permission !== 'adm') {
            for (let i = 0; i < shoppingCartItem.length; i++) {
                deleteData(i);
                console.log(`PayOk ${shoppingCartItem[i]}`);
            };
        } else setLoadFinishing(false);

        setAlertCancelPurchaseActive(false);
        setRegisterMenuActive(false);
        setShoppingCartItem([]);
    };

    function Menu() {
        return (
            <>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginVertical: 6 }}>
                    {<Text style={{ fontSize: 40 }}>{shoppingCartItem.length}</Text>}
                    {"\n"}NÚMEROS POR APENAS{"\n"}{<Text style={{ fontSize: 25 }}>R$ {price}</Text>}
                </Text>
                <View style={{ width: 250 }} >
                    <Text style={{ color: '#fff', fontSize: 20 }}>Nome Completo*</Text>
                    <InputName />
                </View>

                <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                    <View style={{ width: 70 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>DDD*</Text>
                        <InputDDD style={{ marginRight: 10 }} />
                    </View>

                    <View style={{ width: 180 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Telefone*</Text>
                        <InputTelePhone />
                    </View>
                </View>

                <TouchableOpacity onPress={() => ButtonBuy()} style={styles.buttonPay} >
                    <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>Concluir</Text>
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Link de Pagamento com PIX</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonPay, { backgroundColor: '#DAA520' }]} >
                    <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>Revender</Text>
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Apenas para representantes</Text>
                </TouchableOpacity>
            </>
        );
    }

    function MenuCancelBuy() {
        return <>
            <TouchableOpacity onPress={() => {
                setAlertCancelPurchaseActive(false);
            }} style={styles.containeMain} />

            <View style={styles.container} >
                <Text style={styles.textAlertCancel}>Deseja cancelar a sua compra?</Text>
                <TouchableOpacity
                    onPress={() => setAlertCancelPurchaseActive(false)}
                    style={styles.buttonPay} >
                    <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>Continuar</Text>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Voltar ao formulario</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => ButtonCancelBuy()} style={[styles.buttonPay, { backgroundColor: '#E22222' }]} >
                    <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>Cancelar</Text>
                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>O carrinho será esvaziado ao cancelar</Text>
                </TouchableOpacity>
                <Text style={[styles.textAlertCancel, { fontSize: 20 }]}></Text>
            </View>
        </>
    };

    return (
        registerMenuActive ? (
            alertCancelPurchaseActive ? <MenuCancelBuy /> :
                <>
                    <TouchableOpacity onPress={() => {
                        setAlertCancelPurchaseActive(true);
                    }} style={styles.containeMain} />

                    <View style={styles.container} >
                        {loadFinishing ? <Load /> : <Menu />}
                    </View>
                </>
        ) : null
    );
};