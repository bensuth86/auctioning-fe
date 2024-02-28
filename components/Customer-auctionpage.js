import { View, Text, Alert, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { auctionStyles } from '../auction-stylesheet'
import { TextInput, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { Button } from '../helpers'
import { useContext } from 'react'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { getBusinessById, getUsersById, postNewAuction } from '../utils'
import { getAuctionByAuctionId } from '../utils'
// import { io } from 'socket.io-client'
import { updateBid } from '../utils'
import { convertTime } from '../helpers'
import { socket } from '../socket'
import { selectedMovieStyle } from '../style-sheet-selected-movie'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native-paper'

function CustomerAuctionPage({ navigation, route }) {
  const { currentCustomer } = useContext(CustomerContext)
  const {
    event_id,
    business_id,
    film_title,
    poster,
    certificate,
    run_time,
    start_time,
    start_price,
    seat_selection,
    selectedAuction,
  } = route.params
  const [userBid, setUserBid] = useState('')
  const [auctionID, setAuctionID] = useState(selectedAuction || null)
  const [countdown, setCountdown] = useState(false)
  const [countdownStructure, setCountdownStructure] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [displayAuction, setDisplayAuction] = useState({})
  const [tempUser, setTempUser] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiErr, setApiErr] = useState(null)
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [successBidMessage, setSuccessBidMessage] = useState(false)
  const createAlert = (msg) =>
    Alert.alert('A new bid!', msg, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  const exitAlert = (msg) =>
    Alert.alert('Somebody beat you to it...', msg, [
      { text: 'Back', onPress: () => navigation.goBack() },
    ])

  useEffect(() => {
    getBusinessById(business_id.business_id)
      .then((response) => {
        setSelectedBusiness(response)
      })
      .then(() => {
        if (auctionID) {
          getAuctionByAuctionId(auctionID)
            .then(({ data: { auction } }) => {
              setDisplayAuction(auction)
              getCountdown(auction.time_ending)
              setCountdown(true)
              return auction.current_highest_bidder
            })
            .then((user_id) => {
              getUsersById(user_id).then((user) => {
                setTempUser(user.username)
                setIsLoading(false)
              })
            })
        } else {
          setIsLoading(false)
        }
      })
  }, [])
  //console.log(displayAuction)
  useEffect(() => {
    function onBidEvent(bidData) {
      // console.log(displayAuction, 'inside')
      if (
        seat_selection.selectedSeats.some((seat) =>
          bidData.seats.includes(seat)
        ) &&
        currentCustomer.username !== bidData.username &&
        !auctionID
      ) {
        exitAlert(`One of the seats you selected has been bid on!`)
      } else if (
        auctionID === bidData.auction_id &&
        currentCustomer.username !== bidData.username
      ) {
        const newCount = Number(displayAuction.bid_counter) + 1
        setDisplayAuction({
          ...displayAuction,
          current_price: bidData.newBid,
          bid_counter: displayAuction.bid_counter + 1,
        })
        setTempUser(bidData.username)
        createAlert(
          `${bidData.username} is now the highest bidder with £${bidData.newBid}`
        )
      }
    }

    socket.on('new bid', onBidEvent)

    return () => {
      socket.off('new bid', onBidEvent)
    }
  }, [auctionID, displayAuction])

  function submitBid() {
    if (isNaN(userBid)) {
      setErrorMessage(`Please enter a number.`)
      return false
    } else if (Number(userBid) <= Number(displayAuction.current_price)) {
      setErrorMessage(
        `You need to place a bid greater than £${displayAuction.current_price}.`
      )
      return false
    } else if (Number(userBid) >= 100) {
      setErrorMessage(
        `You cannot bid £100 or over, find another seat to bid on...`
      )
      return false
    }

    setErrorMessage('')
    setUserBid('')
    return true
  }

  function initiateAuction() {
    setSubmitted(true)
    const newAuctionData = {
      event_id: Number(event_id.event_id),
      seat_selection: seat_selection.selectedSeats,
      current_price: Number(start_price.start_price),
      user_id: Number(currentCustomer.user_id),
    }
    setDisplayAuction({
      current_price: start_price.start_price,
      bid_counter: 1,
      active: true,
    })
    setCountdownStructure({
      days: 0,
      hours: 0,
      minutes: 4,
      seconds: 59,
      ended: null,
    })
    getCountdown(new Date().setMinutes(new Date().getMinutes() + 5))
    setCountdown(true)
    setTempUser(currentCustomer.username)
    postNewAuction(newAuctionData)
      .then(({ data: { auction } }) => {
        socket.emit('new bid', {
          newBid: auction.start_price,
          auction_id: auction.auction_id,
          seats: auction.seat_selection,
          username: currentCustomer.username,
        })
        setAuctionID(auction.auction_id)
        setSubmitted(false)
        setDisplayAuction(auction)
        //getCountdown(auction.time_ending)
      })
      .catch((err) => {
        setApiErr(err.message)
        setDisplayAuction({})
        setTempUser(null)
        setCountdown(false)
        setSubmitted(false)
      })
  }

  function handleNewBid() {
    setSuccessBidMessage(false) //////
    const currentInfo = {
      user: tempUser,
      bid: displayAuction.current_price,
      count: displayAuction.bid_counter,
    }
    if (!submitBid(userBid)) return
    setSubmitted(true)
    setDisplayAuction({
      ...displayAuction,
      current_price: userBid,
      bid_counter: displayAuction.bid_counter + 1,
    })
    setSuccessBidMessage(true) //////
    setTempUser(currentCustomer.username)
    updateBid(auctionID, {
      current_bid: Number(userBid),
      user_id: currentCustomer.user_id,
    })
      .then((response) => {
        // setSuccessBidMessage(true)////
        setDisplayAuction(response.data.auction)
        setTempUser(currentCustomer.username)
        socket.emit('new bid', {
          newBid: userBid,
          auction_id: auctionID,
          username: currentCustomer.username,
          seats: seat_selection.selectedSeats,
        })
        console.log(
          userBid,
          auctionID,
          seat_selection.selectedSeats,
          currentCustomer.username,
          'bid sent'
        )
        setUserBid('')
        setSubmitted(false)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
        setTempUser(currentInfo.user)
        setDisplayAuction({
          ...displayAuction,
          current_price: currentInfo.bid,
          bid_counter: currentInfo.count,
        })
        setApiErr(err.message)
        setSuccessBidMessage(false)
      })
  }

  function getCountdown(endDate) {
    const endTime = new Date(endDate).getTime()

    const interval = setInterval(function () {
      const now = new Date().getTime()

      const timeDiff = endTime - now
      if (timeDiff <= 0) {
        clearInterval(interval)
        setCountdown(false)
        setCountdownStructure({
          days: null,
          hours: null,
          minutes: null,
          seconds: null,
          ended: true,
        })
        return
      }
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      setCountdownStructure({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ended: null,
      })
    }, 1000)
  }

  // console.log('start time', start_time)
  if (isLoading) {
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" size={'large'}/>
      </View>
    )
  }
  // if (apiErr) {
  //   return (
  //     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  //       <View style={styles.darkContainer}>
  //         <Text>{apiErr}</Text>
  //       </View>
  //     </ScrollView>
  //   )
  // }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <Text style={[selectedMovieStyle.eventHeader, {marginBottom: 0}]}>
              {film_title.film_title}, <Text style={{fontFamily:'Comfortaa-Light' }}>{certificate.certificate}</Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome5
                name="map-marker-alt"
                size={12}
                color='rgba(255, 255, 255, 0.4)'
                accessibilityLabel="map icon"
              />
              <Text style={[selectedMovieStyle.text, { marginLeft: 5, color: 'rgba(255, 255, 255, 0.4)' }]}>
                {selectedBusiness.business_name}, {selectedBusiness.postcode}{' '}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Fontisto
                name="date"
                size={12}
                color='rgba(255, 255, 255, 0.4)'
                accessibilityLabel="calendar icon"
              />
              <Text style={[selectedMovieStyle.text, { marginLeft: 5, color: 'rgba(255, 255, 255, 0.4)' }]}>
                {convertTime(start_time.start_time)}
              </Text>
            </View>
          </View>
        </View>
        {countdown && (
          <View style={auctionStyles.timerContainer}>
            <Text style={{color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Comfortaa-Light', fontSize: 12}}>Auction ends in: </Text>
            <Text style={auctionStyles.countdownFont}>
              {countdownStructure.days}d {countdownStructure.hours}h{' '}
              {countdownStructure.minutes}m {countdownStructure.seconds}s
            </Text>
          </View>
        )}
        {!Object.keys(displayAuction).length ? (
          <View>
            <Button
              disabled={submitted}
              btnText="START AUCTION"
              onPress={() => {
                initiateAuction()
              }}
            />
          </View>
        ) : (
          <>
            <View style={auctionStyles.biddingForm}>
              {!countdownStructure.ended && (
                <>
                  <Text style={[auctionStyles.text, { marginRight: 5 }]}>
                    £
                  </Text>
                  <TextInput
                    style={auctionStyles.bidInput}
                    placeholder="Enter bid"
                    onChangeText={(value) => setUserBid(value)}
                    value={userBid}
                    keyboardType="numeric"
                    selectionColor={'rgba(43, 29, 65, 0.1)'}
                  />
                  <View>
                    <Button
                      disabled={submitted}
                      btnText="SUBMIT"
                      onPress={() => {
                        handleNewBid(auctionID)
                      }}
                    />
                  </View>
                </>
              )}
            </View>
            {/* <Text>
                Total: £
                {userBid && !isNaN(userBid)
                  ? Number(
                      userBid * seat_selection.selectedSeats.length
                    ).toFixed(2)
                  : '0.00'}
              </Text> */}
            {/* <View>
                <Button
                  disabled={submitted}
                  btnText="PLACE BID"
                  onPress={() => {
                    handleNewBid(auctionID)
                  }}
                />
              </View> */}
          </>
        )}
        {successBidMessage && !countdownStructure.ended && (
          <View style={auctionStyles.statusContainer}>
            <Text
              style={{
                color: '#7bc47f',
                fontFamily: 'Comfortaa-Light',
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              successfully submitted
            </Text>
          </View>
        )}
        {apiErr ? (
          <View style={auctionStyles.statusContainer}>
            <Text style={auctionStyles.errors}>
              {apiErr} // Please try again.
            </Text>
          </View>
        ) : null}
        {errorMessage && !countdownStructure.ended ? (
          <View style={auctionStyles.statusContainer}>
            <Text style={auctionStyles.errors}>{errorMessage}</Text>
          </View>
        ) : null}
        {/* {countdown && (
            <View style={auctionStyles.timerContainer}>
              <Text style={auctionStyles.text}>Time left: </Text>
              <Text style={auctionStyles.countdownFont}>
                {countdownStructure.hours}h {countdownStructure.minutes}m{' '}
                {countdownStructure.seconds}s
              </Text>
            </View>
          )} */}

        {/* Thought this was affecting styling, will remove
        {countdownStructure.ended ? (
          <View style={auctionStyles.auctionResultButton}>
            {displayAuction.current_highest_bidder ===
            currentCustomer.user_id ? (
              <Button
                btnText="VIEW YOUR ORDER"
                onPress={() => {
                  navigation.navigate('PreviousOrders')
                }}
              />
            ) : (
              <Button
                btnText="BACK TO SCREENINGS"
                onPress={() => {
                  navigation.navigate('CustomerHomepage')
                }}
              />
            )}
          </View>
        ) : null} */}
        <View style={auctionStyles.auctionResultButton}>
          {countdownStructure.ended &&
            displayAuction.current_highest_bidder ===
              currentCustomer.user_id && (
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Regular',
                    fontSize: 16,
                    color: '#f5f5f5',
                  }}
                >
                  Congratulations, you won!
                </Text>
                <Button
                  btnText="VIEW YOUR ORDER"
                  onPress={() => {
                    navigation.navigate('PreviousOrders')
                  }}
                />
              </View>
            )}
          {countdownStructure.ended &&
            displayAuction.current_highest_bidder !==
              currentCustomer.user_id && (
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Regular',
                    fontSize: 16,
                    color: '#f5f5f5',
                  }}
                >
                  Oh no, you lost!
                </Text>
                <Button
                  btnText="BACK TO SCREENINGS"
                  onPress={() => {
                    navigation.navigate('CustomerHomepage')
                  }}
                />
              </View>
            )}
        </View>
        <View style={auctionStyles.container}>
          <View style={auctionStyles.singleInfoContainer}>
            <Text style={auctionStyles.auctionHeaders}>
              SEAT SELECTION:{' '}
              <Text style={auctionStyles.auctionData}>
                {seat_selection.selectedSeats.join(', ')}
              </Text>
            </Text>
          </View>
          {Object.keys(displayAuction).length ? (
            <View style={auctionStyles.biddingInfoContainer}>
              <View style={auctionStyles.highestBidInfoContainer}>
                <Text style={auctionStyles.auctionHeaders}>CURRENT BID:</Text>
                <Text style={auctionStyles.auctionData}>
                  £{Number(displayAuction.current_price).toFixed(2)}
                </Text>
                <Text style={auctionStyles.auctionData}>
                  (£
                  {Number(
                    displayAuction.current_price *
                      seat_selection.selectedSeats.length
                  ).toFixed(2)}{' '}
                  total)
                </Text>
              </View>
              <View style={auctionStyles.otherBidInfoContainer}>
                <View
                  style={[
                    auctionStyles.smallerBidInfoContainer,
                    { marginBottom: 5 },
                  ]}
                >
                  <Text style={auctionStyles.auctionHeaders}>
                    HIGHEST BIDDER:
                  </Text>
                  <Text style={auctionStyles.auctionData}>{tempUser}</Text>
                </View>
                <View
                  style={[
                    auctionStyles.smallerBidInfoContainer,
                    { marginTop: 5 },
                  ]}
                >
                  <Text style={auctionStyles.auctionHeaders}>
                    AUCTION STATUS:{' '}
                  </Text>
                  {!displayAuction.active ? (
                    <Text style={auctionStyles.auctionData}>Inactive</Text>
                  ) : (
                    <Text style={auctionStyles.auctionData}>Active</Text>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View style={auctionStyles.priceInfoContainer}>
              <Text style={auctionStyles.auctionHeaders}>STARTING PRICE: </Text>
              <Text style={auctionStyles.auctionData}>
                £{Number(start_price.start_price).toFixed(2)}{' '}
                {`/ £${Number(start_price.start_price * seat_selection.selectedSeats.length).toFixed(2)} total`}
              </Text>
            </View>
          )}
          {displayAuction.bid_counter && (
            <View style={auctionStyles.singleInfoContainer}>
              <Text style={auctionStyles.auctionHeaders}>
                BIDS:{' '}
                <Text style={auctionStyles.auctionData}>
                  {displayAuction.bid_counter}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
export default CustomerAuctionPage
