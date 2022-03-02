import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10
    },

    containerButton: {
        height: 45,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtoun: {
        fontSize: 17,
        //color: '#121212',
        color: '#fff',
        textAlign: 'center'
    }
});
export { styles };