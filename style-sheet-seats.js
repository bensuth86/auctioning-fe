import { StyleSheet } from 'react-native'

export const seatStyles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#2b1d41',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    paddingBottom: 20,
    paddingTop: 20,
  },
  seatHeader: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15,
    fontFamily: 'Comfortaa-Bold',
  },
  screen: {
    width: 300,
    height: 'auto',
    backgroundColor: '#2b1d41',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  screenText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: '#f5f5f5',
  },
  seatsContainer: {
    width: 'auto',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    gap: 0,
  },
  numberedSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: '#626262',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minWidth: 47,
    minHeight: 35


  },
  availableSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: '#7bc47f',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#7bc47f',
    borderWidth: 3,
    minWidth: 47,
    minHeight: 35


  },
  auctionSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: '#FFBF00',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#FFBF00',
    borderWidth: 3,
    minWidth: 47,
    minHeight: 35

  },
  unavailableSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'grey',
    borderWidth: 3,
    minWidth: 47,
    minHeight: 35
  },
  selectedSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: '#7bc47f',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
    minWidth: 47,
    minHeight: 35
  },
  selectedAuctionSeatButton: {
    margin: 2,
    padding: 2,
    backgroundColor: '#FFBF00',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
    minWidth: 47,
    minHeight: 35
  
  },
  buttontext: {
    fontSize: 10,
    fontFamily: 'Comfortaa-Light',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'

  },
  textbox: {
    padding: 8,
    margin: 10,
    width: 200,
  },
  errorContainer: {
    marginTop: 30,
    width: 'auto',
    borderColor: 'red',
    borderWidth: 2,
  },
  seatKey: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigKeyContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  textBigger: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 16,
  },
  textBiggerBold: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
  },
  textBiggerError: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: 'red',
  },
})
