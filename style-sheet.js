import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#e00c3e',
  },
  buttontext: {
    // letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  textbox: {
    // for text entry
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dropdown: {
    minWidth: 50,
    maxWidth: 50,
    width: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#777',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  // loadingContainer: {
  //   backgroundColor: 'yellow'
  // }
})
