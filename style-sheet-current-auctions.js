import { StyleSheet } from 'react-native'

export const currentAuctions = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  textBold: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    textAlign: 'right',
    color: '#f5f5f5',
  },
})
