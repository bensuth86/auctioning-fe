import { StyleSheet } from 'react-native'

export const seatStyles = StyleSheet.create({
  seatsContainer: {
    // marginBottom: 100,
    width: 'auto',
    borderColor: 'grey',
    borderWidth: 1,
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
    // width: '50px',
    // height: '40px',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  availableSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#7bc47f',
    // width: '50px',
    // height: '40px',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  auctionSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#FFBF00',
    // width: '50px',
    // height: '40px',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  unavailableSeatButton: {
    margin: 5,
    padding: 5,
    // backgroundColor: '#D0D0D0',
    backgroundColor: 'grey',

    // width: '50px',
    // height: '40px',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedSeatButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#7bc47f',
    // width: '47px',
    // height: '37px',
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
    // width: '57px',
    // height: '47px',
    width: '60px',
    height: '50px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: 3,
  },
  buttontext: {
    fontSize: 10,
    lineHeight: 21,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textbox: {
    // for text entry
    padding: 8,
    margin: 10,
    width: 200,
  },
  errorContainer: {
    marginTop: 50,
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
  screen: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'black',
    padding: 5
  },
  screenText: {
    color: 'white',
    textAlign: 'center'
  }
})
