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
import { useIsFocused } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Pressable } from 'react-native'

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
  const [errorMessage, setErrorMessage] = useState('')
  const [seatingPlan, setSeatingPlan] = useState([])
  const auctionSelection = []
  const availableSelection = []
  const [startingPrice, setStartingPrice] = useState([])
  const [loading, setIsLoading] = useState('true')
  const [err, setErr] = useState('false')
  const [auctionError, setAuctionError] = useState('')
  const [rowErr, setRowErr] = useState(false)
  const auctionInfoArray = []
  let auctionSeatInfo = {}
  const [auctionInfo, setAuctionInfo] = useState([])
  // temp auction id
  const [eventAuctions, setEventAuctions] = useState([])
  const [selectedAuction, setSelectedAuction] = useState({})
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })

  const isFocused = useIsFocused()

  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setIsLoading(false)
        setSeatingPlan(response.seating_layout)
      })
      .catch((err) => {
        console.log('>>>', err.response.data.msg)
        if (err.response.data.msg === 'ID not found') {
          setIsLoading(false)
          setErrorMessage('Sorry - the business ID does not exist.\nCannot fetch the seating selection.')
        }
        if (err.response.data.msg === 'Bad request') {
          setIsLoading(false)
          setErrorMessage('Sorry - the business ID is invalid.\nCannot fetch the seating selection.')
        }
        setErr('true')
      })
  }, [business_id, isFocused])

  useEffect(() => {
    setAvailableSeats(available_seats)
    setStartingPrice(start_price)
    setSelectedSeats([])
  }, [isFocused])

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
      .catch((err) => {
        if (err.response.data.msg === 'Event not found.') {
          setIsLoading(false)
          setAuctionError('Sorry - the event does not exist.\nBidding is not available.')
        }
        if (err.response.data.msg === 'Bad request') {
          setIsLoading(false)
          setAuctionError('Sorry - Bad request 400.\nBidding is not available.')
        }
        setErr('true')
      })
  }, [isFocused])

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={seatStyles.topContainer}>
          <View style={styles.topNavStrip}>
            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>← SCREENINGS</Text>
            </Pressable>
          </View>
          <SelectedEvent event_id={event_id} />
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {errorMessage !== '' && (
             <View style={{height: '70%', justifyContent: 'center', alignItems: 'center', padding: 20}}>
             <Text style={styles.error}>{errorMessage}</Text>
           </View>
          )}
          {errorMessage === '' && (
            <>
          <View>
            <Text style={seatStyles.seatHeader}>SELECT YOUR SEATING</Text>
          </View>
          <View style={seatStyles.screen}>
            <Text style={seatStyles.screenText}>SCREEN</Text>
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
                                  ? setSelectedSeats(() => {
                                      setRowErr(false)
                                      return selectedSeats.filter(
                                        (item) => seat !== item
                                      )
                                    })
                                  : setSelectedSeats(() => {
                                      if (Object.keys(selectedAuction).length) {
                                        setSelectedAuction({})
                                        return [seat]
                                      } else {
                                        if (
                                          selectedSeats.length &&
                                          selectedSeats[0][0] !== seat[0]
                                        ) {
                                          setRowErr(true)
                                          return [...selectedSeats]
                                        } else {
                                          setRowErr(false)
                                          return [...selectedSeats, seat]
                                        }
                                      }
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
        <View style={seatStyles.bigKeyContainer}>
          <View style={[seatStyles.halfContainer, { marginRight: 20 }]}>
            <View style={seatStyles.keyContainer}>
              <View
                style={[seatStyles.seatKey, { backgroundColor: '#7bc47f' }]}
              ></View>
              <Text style={seatStyles.text}>Available</Text>
            </View>
            <View style={seatStyles.keyContainer}>
              <View
                style={[seatStyles.seatKey, { backgroundColor: '#FFBF00' }]}
              ></View>
              <Text style={seatStyles.text}>Auction in process</Text>
            </View>
          </View>
          <View style={seatStyles.halfContainer}>
            <View style={seatStyles.keyContainer}>
              <View
                style={[
                  seatStyles.seatKey,
                  { borderWidth: 2, borderColor: 'red' },
                ]}
              ></View>
              <Text style={seatStyles.text}>Selected</Text>
            </View>
            <View style={seatStyles.keyContainer}>
              <View
                style={[seatStyles.seatKey, { backgroundColor: '#D0D0D0' }]}
              ></View>
              <Text style={seatStyles.text}>Unavailable</Text>
            </View>
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
        {auctionError !== '' && (
                <View style={{height: 150, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <Text style={styles.error}>{auctionError}</Text>
              </View>
        )}
        {auctionError === '' && (
          <>
        {selectedSeats.length ? (
          <Text style={seatStyles.textBigger}>
            Selected seats:{' '}
            <Text style={seatStyles.textBiggerBold}>
              {selectedSeats.join(', ')}
            </Text>
          </Text>
        ) : null}
        {selectedSeats.length ? (
          <Text style={seatStyles.textBigger}>
            Price:
            <Text style={seatStyles.textBiggerBold}>
              {' '}
              £
              {selectedSeats.length && Object.keys(selectedAuction).length
                ? Number(selectedAuction.current_price).toFixed(2)
                : Number(start_price).toFixed(2)}
            </Text>
            {selectedSeats.length && Object.keys(selectedAuction).length ? (
              <Text style={seatStyles.textBiggerBold}>
                {' '}
                / {selectedSeats.length} x £
                {Number(
                  selectedAuction.current_price * selectedSeats.length
                ).toFixed(2)}
              </Text>
            ) : (
              <Text style={seatStyles.textBiggerBold}>
                {' '}
                / {selectedSeats.length} x £
                {Number(start_price * selectedSeats.length).toFixed(2)}
              </Text>
            )}
          </Text>
        ) : null}
        {!selectedSeats.length ? (
          <Text style={seatStyles.textBigger}>Please select a seat</Text>
        ) : null}
        {rowErr ? (
          <Text style={seatStyles.textBiggerError}>
            Seats must be in the same row.
          </Text>
        ) : null}
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
            btnText="START AUCTION"
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
            btnText="GO TO AUCTION"
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
          </>
        )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default CustomerSeating
