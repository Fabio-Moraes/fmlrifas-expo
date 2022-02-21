import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        fontSize: 19,
        color: '#121212',
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderRadius: 10,
    },

    load: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderRadius: 10,
    },
});
export { styles };