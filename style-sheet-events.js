import { StyleSheet } from 'react-native'

export const eventStyles = StyleSheet.create({
  eventcard: {
    // margin: 20,
    width: '200',
    alignItems: 'center',
    marginBottom: 60
  },
  eventslist: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    // backgroundColor: 'red'
  },
  mainContent: {
    flexDirection: 'row',
  },
  rightSide: {
    // backgroundColor: '#66808080',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: 'auto',
    width: 150,
    padding: 10,
    flexWrap: 'wrap',

  },
  cardText: {
    flexWrap: 'wrap',
    width: '100%'
  },
  unavailcardText: {
    flexWrap: 'wrap',
    color: 'grey',
    width: '100%'
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
  // unavailableeventcard: {
  //   backgroundColor: 'yellow'
  // }
})
