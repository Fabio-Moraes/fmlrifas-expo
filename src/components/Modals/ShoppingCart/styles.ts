import { StyleSheet,Dimensions } from 'react-native';

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
        width: 270,
        height: 300,
        borderColor: '#356',
        justifyContent: 'space-around',
    },

    listText: {
        fontSize: 19,
        color: '#000',
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderRadius: 10,
    },

    payText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },

    buttonPay: {
        borderRadius: 15,
        width: 230,
        padding: 10,
        marginVertical: 15
    },

    priceHeader: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 6
    },
    
});
export { styles };