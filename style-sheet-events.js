import { StyleSheet } from 'react-native'

export const eventStyles = StyleSheet.create({
  eventcard: {
    width: '200',
    alignItems: 'center',
    marginBottom: 60,
  },
  eventslist: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  mainContent: {
    flexDirection: 'row',
  },
  rightSide: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 150,
    padding: 10,
    flexWrap: 'wrap',
  },
  cardText: {
    flexWrap: 'wrap',
    width: '100%',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  unavailcardText: {
    flexWrap: 'wrap',
    color: 'grey',
    width: '100%',
    fontFamily: 'Comfortaa-Light',
    fontSize: 12,
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontFamily: 'Comfortaa-Bold',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    width: '100%',
  },
})
