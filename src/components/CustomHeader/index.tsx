import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useContexState } from '../../hooks/context';

import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { styles } from './styles';

export function CustomHeader() {
    const {
        setShoppingCartActive,
        setAlertActive,
        setAlertMessage,
        setHamburgerMenuActive 
    } = useContexState();

    const {
        shoppingCartItem,
        hamburgerMenuActive 
    } = useContexState();

    function ButtonShopping() {
        if (shoppingCartItem.length > 0) {
            setShoppingCartActive(true)
        } else {
            setAlertActive(true);
            setAlertMessage('O carrinho está vazio!');
        };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FMLRIFAS</Text>
            <View style={styles.containerMenu}>
                <TouchableOpacity onPress={() => ButtonShopping()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Feather name="shopping-cart" style={{ opacity: hamburgerMenuActive ? .2 : 1 }} size={25} color="#fff" />

                    {shoppingCartItem.length > 0 ? <View style={{ opacity: hamburgerMenuActive ? .5 : 1, position: 'absolute', backgroundColor: '#FF0000', borderRadius: 30, padding: 3, minWidth: 25, height: 25 }}>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: '#fff', }}>{shoppingCartItem.length}</Text>
                    </View> : null
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHamburgerMenuActive(true)}>
                    <SimpleLineIcons name="menu" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

