import { StyleSheet } from 'react-native'

export const eventStyles = StyleSheet.create({
  eventcard: {
    // margin: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 60
  },
  eventslist: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '1000%',
  },
  mainContent: {
    flexDirection: 'row',
  },
  rightSide: {
    // backgroundColor: '#66808080',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'auto',
    padding: 10,
  },
  cardText: {
    flexWrap: 'wrap',
  },
  unavailcardText: {
    flexWrap: 'wrap',
    color: 'grey',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    width: '100%',
  },
})
