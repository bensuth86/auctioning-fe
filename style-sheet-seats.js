import { StyleSheet } from 'react-native'

export const seatStyles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#2b1d41',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '35%',
    paddingBottom: 25,
    // paddingTop: 25
  },
  seatHeader: {
    textAlign: 'center', 
    marginBottom: 20 ,
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
    marginBottom: 20
  },
  screenText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: '#f5f5f5'
  },
  seatsContainer: {
    // marginBottom: 100,
    width: 'auto',
    // backgroundColor: 'yellow'
    // borderColor: 'grey',
    // borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    gap: 0,
    // borderWidth: 1 ////////////
  },
  numberedSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#626262',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  availableSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#7bc47f',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  auctionSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#FFBF00',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  unavailableSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: 'grey',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#7bc47f',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
    
  },
  selectedAuctionSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#FFBF00',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
  },
  buttontext: {
    fontSize: 10,
    fontFamily: 'Comfortaa-Light',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
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
    // backgroundColor: 'pink'
  },
  bigKeyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12
  },
  textBigger: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 16,
    textAlign: 'center'
  },
  textBiggerBold: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16
  },
  textBiggerError: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
    color: 'red'
  }
})
