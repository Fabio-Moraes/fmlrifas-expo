import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard'

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type YourNavigatorProps = NativeStackNavigationProp<ParamListBase, keyof ParamListBase>

import { useLoadPage } from '../../hooks/loadPage'
import { useContexState } from '../../hooks/context';
import { styles } from './styles'

import QRCode from '../../assets/svg/QRCode'

export default function Checkout() {
    const navigation = useNavigation<YourNavigatorProps>();
    const { shoppingCartItem, setShoppingCartItem, listData } = useContexState();
    const { LoadPage } = useLoadPage()

    const conta = shoppingCartItem.length * 19.90;
    const price = (conta).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ backgroundColor: '#555', width: 0, height: 0, top: 0, position: 'absolute' }} onPress={() => navigation.navigate('Home')} />

            <View style={{
                backgroundColor: '#fff',
                height: '90%',
                width: '90%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                <View style={{ alignItems: 'flex-end', width: '90%', paddingTop: 5 }} >

                    <Text style={{ fontSize: 45 }}>R$ {price}</Text>
                </View>

                <QRCode />

                <TouchableOpacity style={{
                    backgroundColor: '#90EE90',
                    padding: 10, borderRadius: 10
                }}
                    onPress={() => Clipboard.setString('james_ti@live.com')}>
                    <Text style={{ fontSize: 27 }}> james_ti@live.com </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>Clique aqui para copiar o codigo pix.</Text>

                <View style={{
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingBottom: 10
                }}>
                    <Text style={{
                        fontSize: 25,
                        color: '#000',
                        width: '95%',
                        paddingVertical: 7,
                        //padding: 10,
                        textAlign: 'center'
                    }}>
                        <Text style={{ fontSize: 32 }}>Pagar com Pix</Text>
                        {'\n'}é facil é rápido!</Text>


                    <Text style={{
                        fontSize: 17,
                        color: '#000',
                        width: '95%',
                        padding: 7
                    }}>• Abra o seu aplicativo Pix do seu
                        Banco ou empresa de Pagamento.</Text>

                    <Text style={{
                        fontSize: 17,
                        color: '#000',
                        width: '95%',
                        padding: 7
                    }}>• Clique em Pagar Pix no seu
                        Aplicativo e aponte a câmera para o QR Code Pix.</Text>

                    <Text style={{
                        fontSize: 17,
                        color: '#000',
                        width: '95%',
                        padding: 7
                    }}>• Pronto, agora é só finalizar
                        o pagamento e aguardar a Aprovação.</Text>

                    <Text style={{
                        fontSize: 17,
                        color: '#000',
                        width: '95%',
                        padding: 7
                    }}>• Se preferir, Copie e Cole o
                        Código Pix no seu Aplicativo ou Site Pix.</Text>


                </View>
                <TouchableOpacity style={{
                    backgroundColor: 'rgb(150,210,255))',
                    padding: 5, marginBottom: 10, borderRadius: 10
                }}
                    onPress={() => {
                        navigation.navigate('Home');
                        setShoppingCartItem([]);
                    }}>
                    <Text style={{ fontSize: 20 }}> Voltar para o site</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}



