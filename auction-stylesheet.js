import { StyleSheet } from 'react-native'

export const auctionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: '90%',
  },
  selectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    backgroundColor: '#838383',
    marginBottom: 10,
    padding: 20,
  },
  auctionNavigation: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  biddingInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 180,
  },
  highestBidInfoContainer: {
    flex: 1,
    backgroundColor: '#e4e5eb',
    padding: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherBidInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    height: 'auto',
  },
  smallerBidInfoContainer: {
    backgroundColor: '#e4e5eb',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  auctionForm: {
    width: '100%',
    flexDirection: 'row',
  },
  bidInput: {
    height: 40,
    borderWidth: 1,
    width: 150,
    backgroundColor: 'white',
    padding: 5
  },
  biddingForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  statusContainer: {
    width: '100%',
    marginBottom: 30
  },
  timerContainer: {
    backgroundColor: 'pink',
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#838383',
  },
  auctionResultButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginBottom: 10,
    marginTop: 10,
    padding: 20
  }
})
