import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        position: 'absolute',
        paddingHorizontal: 20
    },  

    title: {
        fontSize: 25,
        color: '#fff',
    },

    containerMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
});
export { styles };