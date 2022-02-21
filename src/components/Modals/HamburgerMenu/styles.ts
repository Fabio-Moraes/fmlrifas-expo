import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    containeMain: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minWidth: Dimensions.get('window').width,
        minHeight: Dimensions.get('window').height
    },

    container: {
        top: 47,
        width: '100%',
        position: 'absolute',
        alignItems: 'flex-end',
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

    containerButton: {
        //backgroundColor: '#26A744',
        borderRadius: 15,
        //width: 150,
        padding: 10,
        marginTop: 10
    },

    textButton: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left'
    },

});
export { styles };