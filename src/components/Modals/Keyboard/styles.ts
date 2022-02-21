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
        width: 300,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#356',
        position: 'absolute',
    },

    containerResultNumber: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    listText: {
        fontSize: 40,
        color: '#fff',
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 10,
        margin: 20

    },


    containerNumber: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    textNumber: {
        fontSize: 50,
        color: '#fff'
    },

    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 25,
        marginBottom: 15
    },

    buttonLimpar: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtonLimpar: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#17A2B7',
        paddingHorizontal: 13,
        paddingVertical: 12,
        position: 'absolute',
        borderRadius: 5
    },

    buttonConcluir: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtonConcluir: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: '#26A744',
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 5
    },

});
export { styles };