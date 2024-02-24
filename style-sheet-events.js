import { StyleSheet } from 'react-native'

export const eventStyles = StyleSheet.create({
  eventcard: {
    margin: 20,
    width: '100%',
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
    backgroundColor: '#66808080',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 190,
    padding: 10,
  },
  cardText: {
    flexWrap: 'wrap',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
