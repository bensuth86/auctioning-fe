import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
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
  const {
    event_id,
    business_id,
    film_title,
    poster,
    certificate,
    run_time,
    start_time,
    available_seats,
    active,
    start_price,
  } = route.params
  const [availableSeats, setAvailableSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [auctionSeats, setAuctionSeats] = useState([])
  const auctionSeatArray = []
  const [seatingPlan, setSeatingPlan] = useState([])
  const auctionSelection = []
  const availableSelection = []
  const [startingPrice, setStartingPrice] = useState([])
  const [loading, setIsLoading] = useState('true')
  const [err, setErr] = useState('false')
  const auctionInfoArray = []
  let auctionSeatInfo = {}
  const [auctionInfo, setAuctionInfo] = useState([])
  // temp auction id
  const [eventAuctions, setEventAuctions] = useState([])
  const [selectedAuction, setSelectedAuction] = useState({})

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
    setAvailableSeats(available_seats)
    setStartingPrice(start_price)
  }, [])

  useEffect(() => {
    getAuctionsByEventId(event_id)
      .then((response) => {
        setIsLoading(false)
        response.map((auction) => {
          auctionSeatArray.push(...auction.seat_selection)
          auctionInfoArray.push([
            auction.current_price,
            auction.current_highest_bidder,
            auction.auction_id,
            auction.event_id,
            auction.seat_selection,
          ])
        })
        setAuctionSeats(auctionSeatArray)
        setAuctionInfo(auctionInfoArray)
        setEventAuctions(response)
      })
      .catch(() => {
        setErr('true')
      })
  }, [])
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ maxWidth: 300 }}>
          <SelectedEvent event_id={event_id} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Seating:
            </Text>
          </View>

          {seatingPlan.map((row, i) => {
            return (
              <View key={i} style={seatStyles.seatsContainer}>
                <View key={i} style={seatStyles.rowContainer}>
                  {row.map((seat) => {
                    const isAvailable = availableSeats.includes(seat)
                    let isAuctioning = false
                    let auctionPrice
                    eventAuctions.forEach((auction) => {
                      if (auction.seat_selection.includes(seat)) {
                        isAuctioning = true
                        auctionPrice = Number(auction.current_price).toFixed(2)
                      }
                    })
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
                            btnText={`£${Number(start_price).toFixed(2)}`}
                            onPress={() => {
                              {
                                isSelected
                                  ? setSelectedSeats(
                                      selectedSeats.filter(
                                        (item) => seat !== item
                                      )
                                    )
                                  : setSelectedSeats(() => {
                                      if (Object.keys(selectedAuction).length) {
                                        setSelectedAuction({})
                                        return [seat]
                                      } else return [...selectedSeats, seat]
                                    })
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
                            btnText={`£${auctionPrice}`}
                            //btnText="test"
                            onPress={() => {
                              if (isSelected) {
                                setSelectedSeats([])
                                setSelectedAuction({})
                              } else {
                                eventAuctions.forEach((auction) => {
                                  if (auction.seat_selection.includes(seat))
                                    setSelectedSeats(auction.seat_selection)
                                })
                                // setSelectedSeats([...selectedSeats, seat])
                                eventAuctions.forEach((auction) => {
                                  if (auction.seat_selection.includes(seat))
                                    setSelectedAuction(auction)
                                })
                              }
                            }}
                          ></SeatButton>
                        ) : (
                          <DisabledSeatButton
                            disabled={true}
                            seatStyle={seatStyles.unavailableSeatButton}
                            key={seat}
                            btnText={'      '}
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
        <View style={seatStyles.screen}>
          <Text style={seatStyles.screenText}>SCREEN</Text>
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
          <Text></Text>
        </TouchableOpacity>
        {/* {selectedSeats.map((selectedSeat) => {
          const isAuctioning = auctionSeats.includes(selectedSeat)

          isAuctioning
            ? auctionSelection.push(selectedSeat)
            : availableSelection.push(selectedSeat)
        })} */}
        {selectedSeats.length ? (
          <Text>Selected seats: {selectedSeats.join(', ')}</Text>
        ) : null}
        {selectedSeats.length ? (
          <Text>
            Price: £
            {selectedSeats.length && Object.keys(selectedAuction).length
              ? Number(selectedAuction.current_price).toFixed(2)
              : Number(start_price).toFixed(2)}
            {selectedSeats.length && Object.keys(selectedAuction).length
              ? ` (Total £${Number((selectedAuction.current_price) * selectedSeats.length).toFixed(2)})`
              : ` (Total £${Number((start_price) * selectedSeats.length).toFixed(2)})`}
          </Text>
        ) : null}
        {!selectedSeats.length ? <Text>Please select a seat</Text> : null}
        {auctionSelection.length && availableSelection.length ? (
          <>
            <View style={seatStyles.errorContainer}>
              <Text style={seatStyles.textbox}>
                You cannot select tickets both in auction and not in auction.
              </Text>
            </View>
          </>
        ) : selectedSeats.length && !Object.keys(selectedAuction).length ? (
          <Button
            key={'auctionButton'}
            btnText="Start new auction"
            onPress={() =>
              navigation.navigate('AuctionPage', {
                //  auction_info: { auctionSeatInfo },
                seat_selection: { selectedSeats },
                event_id: { event_id },
                business_id: { business_id },
                film_title: { film_title },
                poster: { poster },
                certificate: { certificate },
                run_time: { run_time },
                start_time: { start_time },
                available_seats: { available_seats },
                active: { active },
                start_price: { start_price },
              })
            }
          />
        ) : selectedSeats.length && Object.keys(selectedAuction).length ? (
          <Button
            key={'auctionButton'}
            btnText="Go to auction"
            onPress={() =>
              navigation.navigate('AuctionPage', {
                // auction_info: { auctionSeatInfo },
                seat_selection: { selectedSeats },
                event_id: { event_id },
                business_id: { business_id },
                film_title: { film_title },
                poster: { poster },
                certificate: { certificate },
                run_time: { run_time },
                start_time: { start_time },
                available_seats: { available_seats },
                active: { active },
                start_price: { start_price },
                selectedAuction: selectedAuction.auction_id,
              })
            }
          />
        ) : null}
      </View>
    </ScrollView>
  )
}

export default CustomerSeating
