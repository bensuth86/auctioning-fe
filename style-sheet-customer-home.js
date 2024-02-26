import { StyleSheet } from 'react-native'
// import { useFonts } from 'expo-font'

export const homeStyles = StyleSheet.create({
  navigation: {
    backgroundColor: '#2b1d41',
    width: '100%',
    padding: 10,
    paddingBottom: 10,
    // borderBottomEndRadius: 50,
    // borderBottomLeftRadius: 50,
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
    // backgroundColor: 'red',
    padding: 10,
  },
  numberDial: {
    height: 30,
    borderWidth: 0, // Remove borderWidth
    borderColor: 'transparent', // Set borderColor to transparent
    backgroundColor: 'white',
    padding: 10,
    width: 80,
    borderRadius: 20,
  },
  resultsIntro: {
    textAlign: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
    fontFamily: 'Comfortaa-Regular'
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
    marginTop: 10
  },
  adjustments: {
    width: 20,
    height: 20,
    margin: 10,
  },
})
