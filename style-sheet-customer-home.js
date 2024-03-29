import { StyleSheet } from 'react-native'

export const homeStyles = StyleSheet.create({
  navigation: {
    backgroundColor: '#2b1d41',
    width: '100%',
    padding: 10,
    paddingBottom: 10,
    backgroundColor: '#2b1d41',
  },
  radiusSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  numberDial: {
    height: 30,
    borderWidth: 0,
    borderColor: 'transparent', 
    backgroundColor: '#f5f5f5',
    padding: 10,
    width: 80,
    borderRadius: 20,
    fontFamily: 'Comfortaa-Regular',
  },
  resultsIntro: {
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
    fontFamily: 'Comfortaa-Regular',
    marginBottom: 10
  },
  greetingsOrders: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  radiusContainer: {
    flexDirection: 'column',
    width: 'auto',
    marginTop: 10,
  },
  adjustments: {
    width: 20,
    height: 20,
    margin: 10,
  },
  noResults: {
    margin: 40,
    width: 250,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    textAlign: 'center',
    maxWidth: '100%',
    fontFamily: 'Comfortaa-Regular',
    color: 'red',
  },
  contrastContainer: {
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    // marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 700
  },
})
