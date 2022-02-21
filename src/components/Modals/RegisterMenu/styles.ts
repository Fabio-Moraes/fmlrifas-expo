import { StyleSheet, Dimensions} from 'react-native';

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
        padding: 15,
        flex: 1
    },


    listText: {
        fontSize: 40,
        color: '#000',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        margin: 20

    },

    input: {
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        minHeight: 40,
        fontSize: 25,
        borderColor: '#708090',
        borderWidth: 2,
        backgroundColor: '#356',
        borderRadius: 10,
        color: '#fff'
    },

    payText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center'
    },

    buttonPay: {
        backgroundColor: '#26A744',
        borderRadius: 15,
        width: '100%',
        padding: 10,
        marginTop: 15,
    },


    textAlertCancel: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 10,
        paddingVertical: 20,
    },

});
export { styles };