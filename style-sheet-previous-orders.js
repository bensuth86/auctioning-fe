import { StyleSheet } from 'react-native'

export const orderHistory = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
  },
  individualContainer: {
    marginBottom: 20,
    padding: 5,
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'center',
  },
  rightSideContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    padding: 10,
  },
  info: {
    padding: 2,
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  cardHeader: {
    textAlign: 'center',
    fontFamily: 'Comfortaa-Light',
    fontSize: 16,
    paddingBottom: 5,
  },
  cardHeaderBold: {
    textAlign: 'center',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
    paddingBottom: 5,
  },
  sideInfoHeaders: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
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
    padding: 20,
    width: '100%',
  },
})
