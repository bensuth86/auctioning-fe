import { StyleSheet } from 'react-native'

export const orderHistory = StyleSheet.create({
  // container: {
  //     backgroundColor: 'yellow',
  // },
  individualContainer: {
    marginBottom: 70,
    padding: 5,
    // borderWidth: 1,
    flexDirection: 'row',
    height: 'auto',
  },
  rightSideContainer: {
    // backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    padding: 10,
  },
  info: {
    padding: 2,
    color: '#f5f5f5',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  cardHeader: {
    textAlign: 'center',
    color: '#f5f5f5',
    fontFamily: 'Comfortaa-Light',
    fontSize: 16,
    paddingBottom: 5,
  },
  cardHeaderBold: {
    textAlign: 'center',
    color: '#f5f5f5',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  sideInfoHeaders: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  pageHeader: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 20,
    color: '#f5f5f5',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'red',
    padding: 20,
    width: '100%'
  }
})
