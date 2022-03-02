import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { ScreenContainer } from 'react-native-screens';

import { useContexState } from '../../../hooks/context';
import { styles } from './styles';

export function HamburgerMenu() {
    const {
        setHamburgerMenuActive,
        setLoginMenuActive,
        setLoginValue
    } = useContexState();

    const {
        hamburgerMenuActive,
        loginValue
    } = useContexState();

    function Menu() {
        return <View style={styles.containerMenu}>
            {loginValue.permission !== ''
                ? <View style={[styles.containerButton, { paddingBottom: 6 }]}>
                    <Text style={styles.textButton}>
                        {loginValue.name} {'\n'}{<Text style={{ fontSize: 15 }}>
                            {loginValue.permission === 'adm' ? '(ADM)' : '(Revendedor)'}
                        </ Text>}
                    </Text>
                </ View>
                : <TouchableOpacity
                    onPress={() => {
                        setHamburgerMenuActive(false);
                        setLoginMenuActive(true);
                    }}
                    style={styles.containerButton} >
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>}

            <TouchableOpacity
                onPress={() => { setHamburgerMenuActive(false) }}
                style={styles.containerButton} >
                <Text style={[styles.textButton]}>Meus números</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { setHamburgerMenuActive(false) }}
                style={styles.containerButton} >
                <Text style={styles.textButton}>Quem Somos</Text>
            </TouchableOpacity>

            {loginValue.permission !== ''
                ? <TouchableOpacity
                    onPress={() => {
                        setHamburgerMenuActive(false);
                        setLoginValue({ name: '', password: '', permission: '' });
                    }}
                    style={styles.containerButton} >
                    <Text style={styles.textButton}>Sair</Text>
                </TouchableOpacity>
                : null}

        </ View>
    }

    return hamburgerMenuActive ?
        <>
            <TouchableOpacity onPress={() => {
                setHamburgerMenuActive(false);
            }} style={styles.containeMain} />

            <TouchableOpacity onPress={() => {
                setHamburgerMenuActive(false);
            }} style={[styles.container]} >
                <Menu />
            </TouchableOpacity>
        </> : null
};