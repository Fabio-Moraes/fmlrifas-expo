import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },

    listItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    listText: {
        fontSize: 19,
        color: '#fff',
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderRadius: 10,
    },

    load: {
        padding: 10
    },

    listContainer: {
        flex: 1,
        marginBottom: 10,
        flexDirection: 'column',
    }
});
export { styles };