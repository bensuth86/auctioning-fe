import React from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Button, SeatButton, DisabledSeatButton } from '../helpers'
import { styles } from '../style-sheet'
import { seatStyles } from '../style-sheet-seats.js'
import { useState, useEffect } from 'react'
import SelectedEvent from './Customer-seating-selected-event.js'
import {
  getEventByEventId,
  getBusinessById,
  getAuctionsByEventId,
} from '../utils.js'

function CustomerSeating({ navigation, route }) {
  const { event_id, business_id } = route.params
  const [availableSeats, setAvailableSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([]) // pass down to auction page, which patches it into a new auction
  const [auctionSeats, setAuctionSeats] = useState(['A1', 'B2', 'B3']) // GET /api/auctions/:event_id (map over each auction and push seat_selection into array)
  const [seatingPlan, setSeatingPlan] = useState([])
  const currentPrice = '£2' //GET /auctions/:auctions/event/:event_id
  const auctionSelection = []
  const availableSelection = []
  const [startingPrice, setStartingPrice] = useState([])
  const currentHighestBidder = 'user1' //GET /api/:auctions/:event_id current_highest_bidder from auction with that seat in it
  const [loading, setIsLoading] = useState('true')
  const [auctionInfo, setAuctionInfo] = useState([])
  const [err, setErr] = useState('false')

  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setIsLoading(false)
        setSeatingPlan(response.seating_layout)
      })
      .catch(() => {
        setErr('true')
      })
  }, [business_id])

  useEffect(() => {
    getEventByEventId(event_id)
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        console.log(response.available_seats)
        setAvailableSeats(response.available_seats)
        setStartingPrice(response.start_price)
      })
      .catch(() => {
        setErr('true')
      })
  }, [event_id])

  console.log(availableSeats, '<---- available seats')
  console.log(startingPrice, '<--- start price')

  //   useEffect(() => {
  //     getAuctionsByEventId(event_id).then((response) => {
  //       //   response.map((auction) => {
  //       //     // setAuctionInfo([
  //       //     //   [
  //       //     //     auction.auction_id,
  //       //     //     [auction.seat_selection],
  //       //     //     auction.current_price,
  //       //     //     auction.current_highest_bidder,
  //       //     //   ],
  //       //     // ]) auction.seat_selection.map((seat) => {

  //       //   })
  //       setAuctionSeats([...auctionSeats, seat])
  //     })
  //   }, [])

  //   console.log(auctionInfo, '<---auctionInfo')
  //   console.log(auctionSeats, '<---- auctionSeats')
  //websockets here to change price/current user

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ maxWidth: 300 }}>
          <SelectedEvent event_id={event_id} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Seating:{' '}
            </Text>
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
                                ? seatStyles.selectedAuctionSeatButton
                                : seatStyles.auctionSeatButton
                            }
                            key={seat}
                            btnText={`${currentPrice}${currentHighestBidder}`}
                            onPress={() =>
                              isSelected
                                ? setSelectedSeats(
                                    selectedSeats.filter(
                                      (item) => seat !== item
                                    )
                                  )
                                : setSelectedSeats([...selectedSeats, seat])
                            }
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
              style={[
                seatStyles.seatKey,
                { borderWidth: 2, borderColor: 'red' },
              ]}
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
        {selectedSeats.map((selectedSeat) => {
          const isAuctioning = auctionSeats.includes(selectedSeat)
          isAuctioning
            ? auctionSelection.push(selectedSeat)
            : availableSelection.push(selectedSeat)
        })}
        {auctionSelection.length && availableSelection.length ? (
          <>
            <View style={seatStyles.errorContainer}>
              <Text style={seatStyles.textbox}>
                You cannot select tickets both in auction and not in auction.
              </Text>
            </View>
          </>
        ) : auctionSelection.length > 1 && !availableSelection.length ? (
          <View style={seatStyles.errorContainer}>
            <Text style={seatStyles.textbox}>
              Please only select one seat in auction to go to the auction for
              that group of tickets.
            </Text>
          </View>
        ) : !auctionSelection.length && availableSelection.length ? (
          <Button
            key={'auctionButton'}
            btnText="Start new auction"
            onPress={() =>
              navigation.navigate('AuctionPage', { seat_selection: '4' })
            }
          />
        ) : auctionSelection.length === 1 ? (
          <Button
            key={'auctionButton'}
            btnText="Go to auction"
            onPress={() =>
              navigation.navigate('AuctionPage', {
                seat_selection: '4',
                user_id: '',
                auction_id: '',
              })
            }
          />
        ) : null}
      </View>
    </ScrollView>
  )
}

export default CustomerSeating
