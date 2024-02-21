import React from 'react'
import { View, Text } from 'react-native'
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
    <View style={styles.container}>
        <SelectedEvent/>
      <View>
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
      <Button
        key={'auctionButton'}
        btnText="View Auction"
        onPress={() => navigation.navigate('AuctionPage')}
      />
    </View>
  )
}

export default CustomerSeating
