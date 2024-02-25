import { StyleSheet } from 'react-native'

export const auctionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 20,
    width: '90%',
    marginTop: -40
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
    flexDirection: 'row',
  },
  biddingInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 220,
    // borderRadius: 20
  },
  singleInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: '#e4e5eb',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 10
  },
  priceInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 20
  },
  highestBidInfoContainer: {
    flex: 1,
    // backgroundColor: '#e4e5eb',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  otherBidInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    height: 'auto',
    // borderRadius: 20

  },
  smallerBidInfoContainer: {
    // backgroundColor: '#e4e5eb',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20

  },
  auctionForm: {
    width: '100%',
    flexDirection: 'row',
  },
  bidInput: {
    height: 40,
    // borderWidth: 1,
    width: 140,
    backgroundColor: 'white',
    // padding: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 20
  },
  biddingForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  statusContainer: {
    width: '100%',
    marginBottom: 30,
  },
  timerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
    // backgroundColor: '#838383',
  },
  auctionResultButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
  },
  auctionHeaders: {
    fontFamily: 'Comfortaa-Regular',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12
  },
  auctionData: {
    fontFamily: 'Comfortaa-Regular',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16
  },
  countdownFont: {
    fontFamily: 'KodeMono-Regular',
    fontSize: 40,
    color: '#f5f5f5'
  },
  text: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: '#f5f5f5'
  },
  BidInfoContainer: {
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  }
})
