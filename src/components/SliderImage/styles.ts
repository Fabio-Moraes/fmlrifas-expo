import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBlurImagen: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  imagen: {
    width: 300,
    height: 200,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#333',
    position: 'absolute'
  },

  blurImagen: {
    width: 400,
    height: 300,
    borderRadius: 7,
    position: 'absolute'
  },

  containerFadingText: {
    marginBottom: 7 
  },

  fadingText: {
    fontSize: 28,
    backgroundColor: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 10

  },

  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});
export { styles };