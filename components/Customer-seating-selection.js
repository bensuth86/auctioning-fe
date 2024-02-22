import React from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Button, SeatButton, DisabledSeatButton } from '../helpers'
import { styles } from '../style-sheet'
import { seatStyles } from '../style-sheet-seats.js'
import { useState } from 'react'
import SelectedEvent from './Customer-seating-selected-event.js'

function CustomerSeating({ navigation }) {
  const availableSeats = ['A1', 'B1', 'B2', 'B3'] // GET /api/events/:event_id (available_seats selected by business user)
  const [selectedSeats, setSelectedSeats] = useState([]) // PATCH /api/auctions/:event_id (seat_selection)
  const auctionSeats = ['A1', 'B2', 'B3'] // GET /api/auctions/:event_id (seat_selection)
  const seatingPlan = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4'],
    ['C1', 'C2', 'C3', 'C4'],
  ] // GET /api/businesses (seating_layout)
  const currentPrice = '£2' //GET /auctions/:auctions/event/:event_id
  const [selectionIsAuction, setSelectionIsAuction] = useState([])
  const [selectionIsAvailable, setSelectionIsAvailable] = useState([])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={{ maxWidth: 300 }}>
        <SelectedEvent />
      </View>
      <View style={{marginTop: 20, marginBottom: 20}}>
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Seating: </Text>
      </View>
        {seatingPlan.map((row, i) => {
          return (
            <View key={i}>
              <View key={i} style={seatStyles.rowContainer}>
                {row.map((seat) => {
                  const isAvailable = availableSeats.includes(seat)
                  const isAuctioning = auctionSeats.includes(seat)
                  const isSelected = selectedSeats.includes(seat)
                  return (
                    <View key={seat}>
                      {isAvailable && !isAuctioning ? (
                        <SeatButton
                          seatStyle={
                            isSelected
                              ? seatStyles.selectedSeatButton
                              : seatStyles.availableSeatButton
                          }
                          key={seat}
                          btnText={currentPrice}
                          onPress={() => {
                            {
                              isSelected
                                ? setSelectedSeats(
                                    selectedSeats.filter(
                                      (item) => seat !== item
                                    )
                                  )
                                : setSelectedSeats([...selectedSeats, seat])
                            }
                          }}
                        ></SeatButton>
                      ) : isAuctioning ? (
                        <SeatButton
                          seatStyle={
                            isSelected
                              ? [seatStyles.selectedAuctionSeatButton]
                              : seatStyles.auctionSeatButton
                          }
                          key={seat}
                          btnText={currentPrice}
                          onPress={() => {
                            {
                              isSelected
                                ? setSelectedSeats(
                                    selectedSeats.filter(
                                      (item) => seat !== item
                                    )
                                  )
                                : setSelectedSeats([...selectedSeats, seat])
                            }
                          }}
                        ></SeatButton>
                      ) : (
                        <DisabledSeatButton
                          disabled={true}
                          seatStyle={seatStyles.unavailableSeatButton}
                          key={seat}
                          btnText={'     '}
                        ></DisabledSeatButton>
                      )}
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
      {selectedSeats.map((selectedSeat) => {
        const isAuctioning = auctionSeats.includes(selectedSeat)
        isAuctioning
          ? setSelectionIsAuction(selectedSeat)
          : setSelectionIsAvailable(selectedSeat)
      })}
      {selectionIsAuction.length && selectionIsAvailable.length ? (
        <View style={seatStyles.errorContainer}>
          <Text style={seatStyles.textbox}>
            You cannot select tickets both in auction and not in auction.
          </Text>
        </View>
      ) : null}
      <View style={{ marginTop: 10 }}>
        <View style={seatStyles.keyContainer}>
          <View
            style={[seatStyles.seatKey, { backgroundColor: '#7bc47f' }]}
          ></View>
          <Text>Available</Text>
        </View>
        <View style={seatStyles.keyContainer}>
          <View
            style={[seatStyles.seatKey, { backgroundColor: '#FFBF00' }]}
          ></View>
          <Text>Auction in process</Text>
        </View>
        <View style={seatStyles.keyContainer}>
          <View
            style={[seatStyles.seatKey, { borderWidth: 2, borderColor: 'red' }]}
          ></View>
          <Text>Selected</Text>
        </View>
        <View style={seatStyles.keyContainer}>
          <View
            style={[seatStyles.seatKey, { backgroundColor: '#D0D0D0' }]}
          ></View>
          <Text>Unavailable</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Selection instructions',
            'This is where all of the info for seat selections will be.'
          )
        }}
        title="?"
      >
        <Text>?</Text>
      </TouchableOpacity>
      <Text>Selected seats:</Text>
      <Text>Price per seat: £</Text>
      <Button
        key={'auctionButton'}
        btnText="View Auction"
        onPress={() => navigation.navigate('AuctionPage')}
      />
    </View>
    </ScrollView>
  )
}

export default CustomerSeating
