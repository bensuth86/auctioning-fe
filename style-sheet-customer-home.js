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
    padding: 10
  },
  numberDial: {
    height: 30,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    width: 80
  },
  resultsIntro: {
    textAlign: 'center',
    padding: 10
  },
  greetingsOrders: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  radiusContainer: {
    flexDirection: 'column',
    width: 'auto'
  },
  adjustments: {
    width: 20,
    height: 20,
    margin: 10
  }
})
