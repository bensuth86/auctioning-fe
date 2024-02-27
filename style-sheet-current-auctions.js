import { StyleSheet } from 'react-native'

export const currentAuctions = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignContent: 'space-between'
  },
  text: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  textBold: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    textAlign: 'left',
    color: '#f5f5f5',
  },
  left: {
   justifyContent: 'center',
   alignItems: 'center'
  },
  right: {
   marginLeft: 5
  }
})
