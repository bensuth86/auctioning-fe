import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
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
    available_seats,
    active,
    start_price,
    seat_selection,
    auction_info,
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
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const createAlert = (msg) =>
    Alert.alert('A new bid!', msg, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])

  useEffect(() => {
    getBusinessById(business_id.business_id).then((response) => {
      setSelectedBusiness(response)
    })
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
          })
        })
    }
  }, [])

  useEffect(() => {
    function onBidEvent(bidData) {
      if (
        auctionID === bidData.auction_id &&
        currentCustomer.username !== bidData.username
      ) {
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
  }, [auctionID])

  function submitBid() {
    // const priceCap = displayAuction.current_price * 4 // multiply starting price by 4 (anything over will be blocked)
    if (isNaN(userBid)) {
      setErrorMessage(`Please enter a number.`)
      return false
    } else if (userBid <= displayAuction.current_price) {
      setErrorMessage(
        `You need to place a bid greater than £${displayAuction.current_price}.`
      )
      return false
    } else if (userBid < start_price.start_price) {
      setErrorMessage(
        `You need to place a minimum bid of £${Number(start_price.start_price) + 1}.`
      )
      return false
    }
    // } else if (userBid > priceCap) {
    //   setErrorMessage(
    //     `You have exceeded the price cap of this auction. Please enter an amount less than £${priceCap}.`
    //   )
    //   return false
    // }
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
    postNewAuction(newAuctionData)
      .then(({ data: { auction } }) => {
        setDisplayAuction(auction)
        setAuctionID(auction.auction_id)
        setSubmitted(false)
        getCountdown(auction.time_ending)
        setCountdown(true)
        setTempUser(currentCustomer.username)
      })
      .catch((err) => {
        setApiErr(err)
        setDisplayAuction(null)
      })
  }

  function handleNewBid() {
    setSubmitted(true)
    if (!submitBid(userBid)) return
    updateBid(auctionID, {
      current_bid: Number(userBid),
      user_id: currentCustomer.user_id,
    })
      .then((response) => {
        setDisplayAuction(response.data.auction)
        setTempUser(currentCustomer.username)
        socket.emit('new bid', {
          newBid: userBid,
          auction_id: auctionID,
          username: currentCustomer.username,
        })
        setUserBid('')
        setSubmitted(false)
      })
      .catch((err) => {
        console.log(err)
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
          hours: null,
          minutes: null,
          seconds: null,
          ended: true,
        })
        return
      }
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      setCountdownStructure({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ended: null,
      })
    }, 1000)
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={auctionStyles.container}>
          <View style={{ width: '100%' }}>
            <Text
              style={{ textAlign: 'center', fontSize: 25, marginBottom: 10 }}
            >
              {film_title.film_title}
            </Text>
            <View style={selectedMovieStyle.eventContainer}>
              <View style={selectedMovieStyle.imageContainer}>
                <Image
                  source={{ uri: poster.poster }}
                  style={{ width: 112.5, height: 166.5 }}
                />
              </View>
              <View style={selectedMovieStyle.eventInfo}>
                <Text style={selectedMovieStyle.text}>
                  {selectedBusiness.business_name}
                </Text>
                <Text style={selectedMovieStyle.text}>
                  {selectedBusiness.postcode}
                </Text>
                <Text></Text>
                <Text style={selectedMovieStyle.text}>
                  Rating: {certificate.certificate}
                </Text>
                <Text style={selectedMovieStyle.text}>
                  Run time: {run_time.run_time} minutes
                </Text>
                <Text>Start time: {convertTime(start_time.start_time)}</Text>
              </View>
            </View>
          </View>
          <View style={auctionStyles.singleInfoContainer}>
            <Text style={{ textAlign: 'center' }}>
              Seat selection:{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {seat_selection.selectedSeats.join(', ')}
              </Text>
            </Text>
          </View>
          {auctionID ? (
            <View style={auctionStyles.biddingInfoContainer}>
              <View style={auctionStyles.highestBidInfoContainer}>
                <Text style={{ textAlign: 'center' }}>
                  Current highest bid:
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 25 }}>
                  £{displayAuction.current_price}
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  (Total: £
                  {Number(
                    displayAuction.current_price *
                      seat_selection.selectedSeats.length
                  ).toFixed(2)}
                  )
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  Number of bids so far: {displayAuction.bid_counter}
                </Text>
              </View>
              <View style={auctionStyles.otherBidInfoContainer}>
                <View
                  style={[
                    auctionStyles.smallerBidInfoContainer,
                    { marginBottom: 5 },
                  ]}
                >
                  <Text>Highest bidder:</Text>
                  <Text style={{ fontSize: 25 }}>{tempUser}</Text>
                </View>
                <View
                  style={[
                    auctionStyles.smallerBidInfoContainer,
                    { marginTop: 5 },
                  ]}
                >
                  <Text>Auction status: </Text>
                  {!displayAuction.active ? (
                    <Text style={{ fontSize: 25 }}>Inactive</Text>
                  ) : (
                    <Text style={{ fontSize: 25 }}>Active</Text>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View style={auctionStyles.priceInfoContainer}>
              <Text style={{ textAlign: 'center' }}>
                Starting Price:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  £{Number(start_price.start_price).toFixed(2)}
                </Text>
                {` (Total £${Number(start_price.start_price * seat_selection.selectedSeats.length).toFixed(2)})`}
              </Text>
            </View>
          )}

          {!displayAuction.active ? (
            <View>
              <Button
                disabled={submitted}
                btnText="start auction"
                onPress={() => {
                  initiateAuction()
                }}
              />
            </View>
          ) : (
            <>
              <View style={auctionStyles.biddingForm}>
                <Text>Bid per seat: </Text>
                <TextInput
                  style={auctionStyles.bidInput}
                  placeholder="Enter your bid here"
                  onChangeText={(value) => setUserBid(value)}
                  value={userBid}
                  keyboardType="numeric"
                />
              </View>
              <Text>
                Total: £
                {userBid && !isNaN(userBid)
                  ? Number(
                      userBid * seat_selection.selectedSeats.length
                    ).toFixed(2)
                  : '0.00'}
              </Text>
              <View>
                <Button
                  disabled={submitted}
                  btnText="place bid"
                  onPress={() => {
                    handleNewBid(auctionID)
                  }}
                />
              </View>
            </>
          )}
          {errorMessage ? (
            <View style={auctionStyles.statusContainer}>
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {errorMessage}
              </Text>
            </View>
          ) : null}
          {countdown && (
            <View style={auctionStyles.timerContainer}>
              <Text style={{ color: 'white' }}>Timer:</Text>
              <Text style={{ fontSize: 25, color: 'white' }}>
                {countdownStructure.hours}h {countdownStructure.minutes}m{' '}
                {countdownStructure.seconds}s
              </Text>
            </View>
          )}
          <View style={auctionStyles.auctionResultButton}>
            {countdownStructure.ended &&
              displayAuction.current_highest_bidder ===
                currentCustomer.user_id && (
                <TouchableOpacity
                  title="ViewOrder"
                  onPress={() => navigation.navigate('PreviousOrders')}
                >
                  <Text>View your order</Text>
                </TouchableOpacity>
              )}
            {countdownStructure.ended &&
              displayAuction.current_highest_bidder !==
                currentCustomer.user_id && (
                <TouchableOpacity
                  title="BackToHomepage"
                  onPress={() => navigation.navigate('CustomerHomepage')}
                >
                  <Text>Back to auctions</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default CustomerAuctionPage
