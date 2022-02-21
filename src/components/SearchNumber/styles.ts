import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(50,50,50,0.7)',
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 115,
        marginHorizontal: 5,
        height: 30,
    },

    input: {
        textAlign: 'center',
        textAlignVertical: 'center',
        minHeight: 32,
        width: '100%',
        fontSize: 17,
        borderColor: 'gray',
        borderWidth: 2,
        backgroundColor: '#333',
        borderRadius: 10,
        color: '#fff'
    },

    button: {
        paddingHorizontal: 4
    }
});
export { styles };