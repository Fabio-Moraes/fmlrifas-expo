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

import { useContexState } from '../../../hooks/context';
import { styles } from './styles';

import api from '../../../services/api';

export function LoginMenu() {
    const {
        setLoginMenuActive,
        setLoginValue
    } = useContexState();

    const {
        loginMenuActive
    } = useContexState();

    const [loadFinishing, setLoadFinishing] = useState(false);

    const inputName = useRef('');
    const inputPassword = useRef('');

    function InputName({ style }: TextInputProps) {
        return (
            <TextInput
                style={[styles.input, style]}
                onChangeText={text => inputName.current = text}
                maxLength={40}
                autoCorrect={false}
                spellCheck={false}
            />
        );
    };

    function InputPassword({ style }: TextInputProps) {
        return (
            <TextInput
                style={[styles.input, style]}
                onChangeText={text => inputPassword.current = text}
                maxLength={9}
                autoCorrect={false}
                spellCheck={false}
            />
        );
    };

    function Load() {
        return (
            <>
                <Text style={styles.textLoad}>Conectando!</Text>
                <ActivityIndicator size={37} color='#fff' style={styles.indicator} />
            </>
        );
    }

    function ConnectLogin() {
        setLoadFinishing(true);
        api.post("login", {
            name: String(inputName.current),
            password: String(inputPassword.current),
        }).then(({ data }) => {
            if (data.name !== 'User not found') {
                setLoginMenuActive(false);
                setLoginValue({
                    name: data.name,
                    password: data.password,
                    permission: data.permission
                });
            };
            setLoadFinishing(false);
        });
    };

    function Menu() {
        return (
            <>
                <View style={{ width: 250 }} >
                    <Text style={{ color: '#fff', fontSize: 20 }}>Usuário</Text>
                    <InputName />
                </View>

                <View style={{ width: 250 }} >
                    <Text style={{ color: '#fff', fontSize: 20 }}>Senha</Text>
                    <InputPassword />
                </View>

                <TouchableOpacity onPress={() => ConnectLogin()} style={styles.buttonPay} >
                    <Text style={{ color: '#fff', fontSize: 30, textAlign: 'center' }}>Entrar</Text>
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Apenas para representantes</Text>
                </TouchableOpacity>
            </>
        );
    }

    return (
        loginMenuActive ? <>
            <TouchableOpacity
                onPress={() => setLoginMenuActive(false)}
                style={styles.containeMain} />

            <View style={styles.container} >
                {loadFinishing ? <Load /> : <Menu />}
            </View>
        </> : null
    );
};