import { StyleSheet } from 'react-native'

export const seatStyles = StyleSheet.create({
  seatsContainer: {
    marginBottom: 100,
    width: 'auto',
    borderColor: 'grey',
    borderWidth: '2px',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 'auto',
    gap: 10,
  },
  numberedSeatButton: {
    margin: 10,
    padding: 1,
    backgroundColor: '#626262',
    width: '30px',
    height: '25px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  availableSeatButton: {
    margin: 10,
    padding: 1,
    backgroundColor: '#7bc47f',
    width: '30px',
    height: '25px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  auctionSeatButton: {
    margin: 10,
    padding: 1,
    backgroundColor: '#FFBF00',
    width: '30px',
    height: '25px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  unavailableSeatButton: {
    margin: 10,
    padding: 1,
    backgroundColor: '#D0D0D0',
    width: '30px',
    height: '25px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedSeatButton: {
    margin: 8,
    padding: 0,
    backgroundColor: '#7bc47f',
    width: '27px',
    height: '22px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: '3px',
  },
  selectedAuctionSeatButton: {
    margin: 8,
    padding: 0,
    backgroundColor: '#FFBF00',
    width: '27px',
    height: '22px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'red',
    borderWidth: '3px',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
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
    marginBottom: 100,
    width: 'auto',
    borderColor: 'red',
    borderWidth: '2px',
  },
  seatKey: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  keyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
