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
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        marginHorizontal: 10,
        paddingVertical: 20,
    },


});

export { styles };