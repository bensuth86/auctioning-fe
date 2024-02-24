import { StyleSheet } from 'react-native'

export const orderHistory = StyleSheet.create({
  // container: {
  //     backgroundColor: 'yellow',
  // },
  individualContainer: {
    marginBottom: 20,
    padding: 5,
    // borderWidth: 1,
    flexDirection: 'row',
    height: 'auto'
  },
  rightSideContainer: {
    backgroundColor: '#66808080',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    padding: 10,
  },
  info: {
    padding: 2
  }
})
