import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    flexDirection: 'column'
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#2b1d41',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    flexDirection: 'column'
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e00c3e',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  },
  buttontext: {
    // letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  textbox: {
    // for text entry
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 20,
    height: 40
  },
  textboxLight: {
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    width: 200,
    borderRadius: 20,
    height: 40,
    fontWeight: 'normal',
    fontFamily: 'Comfortaa-Light',
    
  },
  dropdownContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginHorizontal: 10,
    // backgroundColor: '#f5f5f5',
    // borderRadius: 20,
    // borderWidth: 0,
    // height: 40
    marginLeft: 10,
    marginRight: 10
  },
  // dropdown: {
  //   minWidth: 50,
  //   maxWidth: 50,
  //   borderRadius: 20,
  //   width: 50,
  //   marginHorizontal: 10,
  //   borderWidth: 0,
  //   backgroundColor: '#f5f5f5',
  //   height: 40
  // },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 20,
    width: 'auto',
  },
  backButtonText: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
    color: '#f5f5f5',
  },
  topNavStrip: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  error: {
    color: 'red',
    fontFamily: 'Comfortaa-Light',
    textAlign: 'center'
  }
})
