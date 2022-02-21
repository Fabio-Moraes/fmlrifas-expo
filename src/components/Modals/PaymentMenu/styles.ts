import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    containeMain: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height
    },

    container: {
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#356',
        justifyContent: 'space-around',

    },

    listText: {
        fontSize: 40,
        color: '#000',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 20

    },

    textLoadPopUp: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 10
    },

    ActivityIndicator: {
        marginTop: 10,
        marginBottom: 20
    },

    containerButtonPurchase: {
        backgroundColor: '#26A744',
        borderRadius: 15,
        width: 230,
        padding: 10
    },

    textButtonPurchase: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },

    containerButtonAddCart: {
        backgroundColor: '#7B68EE',
        borderRadius: 15,
        width: 230,
        padding: 10,
        margin: 10
    },

    textButtonAddCart: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },

    listTextComponent: {
        backgroundColor: '#445566',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: '90%'
    }
});
export { styles };