import { StyleSheet } from 'react-native'
// import { useFonts } from 'expo-font'

export const homeStyles = StyleSheet.create({
  navigation: {
    // backgroundColor: 'yellow',
    width: '100%',
    padding: 10,
  },
  radiusSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }
})
