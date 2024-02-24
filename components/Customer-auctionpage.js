import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { auctionStyles } from '../auction-stylesheet'
import { TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { Button } from '../helpers'
import { useContext } from 'react'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { postNewAuction } from '../utils'
import { getAuctionByAuctionId } from '../utils'
import { io } from 'socket.io-client'
import { updateBid } from '../utils'
import { convertTime } from '../helpers'

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
  } = route.params
  const [userBid, setUserBid] = useState('')
  const [countdown, setCountdown] = useState(false)
  const [countdownStructure, setCountdownStructure] = useState({})
  const [auctionID, setAuctionID] = useState(
    auction_info.auctionSeatInfo[2] || null
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [displayAuction, setDisplayAuction] = useState({})
  const socket = io('https://auctioning-be.onrender.com/')
  const [bidMessage, setBidMessage] = useState(null)
  const [tempUser, setTempUser] = useState(null)
  console.log(auction_info.auctionSeatInfo[2])
  console.log(auctionID)
  const createAlert = (msg) =>
    Alert.alert('A new bid!', msg, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`⚡: ${socket.id} user just connected!`)
    })
  }, [])
  socket.on('new bid', (bidData) => {
    console.log(bidData, 'socket ')
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
      console.log('here')
      // createAlert(
      //   `${bidData.username} is now the highest bidder with £${bidData.newBid}`
      // )
      // setBidMessage(
      //   `${bidData.username} is now the highest bidder with £${bidData.newBid}`
      // )
    }
  })

  useEffect(() => {
    if (auctionID) {
      console.log('ahian')
      getAuctionByAuctionId(auctionID).then(({ data: { auction } }) => {
        setDisplayAuction(auction)
      })
    }
  }, [])

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
        `You need to place a minimum bid of £${start_price.start_price + 1}.`
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
    if (!submitBid(userBid)) return
    const newAuctionData = {
      event_id: Number(event_id.event_id),
      seat_selection: seat_selection.selectedSeats,
      current_price: Number(userBid),
      user_id: Number(currentCustomer.user_id),
    }
    postNewAuction(newAuctionData)
      .then(({ data: { auction } }) => {
        setDisplayAuction(auction)
        setAuctionID(auction.auction_id)
        setUserBid('')
        setCountdown(true) ////////
      })
      .catch((err) => console.log(err))
  }

  function handleTextChange(text) {
    setUserBid(text)
  }

  function handleNewBid() {
    if (!submitBid(userBid)) return
    updateBid(auctionID, {
      current_bid: Number(userBid),
      user_id: currentCustomer.user_id,
    })
      .then((response) => {
        console.log('how many')
        setDisplayAuction(response.data.auction)
        setTempUser(currentCustomer.username)
        socket.emit('new bid', {
          newBid: userBid,
          auction_id: auctionID,
          username: currentCustomer.username,
        })
        setUserBid('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (countdown) {
    const startTime = new Date(displayAuction.time_started).getTime()
    const endTime = new Date(displayAuction.time_ending).getTime()

    const interval = setInterval(function () {
      const now = new Date().getTime();

      const timeDiff = endTime - startTime - (now - startTime);

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
          <View style={auctionStyles.auctionNavigation}>
            <TouchableOpacity
              title="backToSeating"
              onPress={() =>
                navigation.navigate('SeatingPage', {
                  event_id: event_id.event_id,
                  business_id: business_id.business_id,
                })
              }
            >
              <Text>← BACK TO SEATING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Auction instructions',
                  'This is where all of the info for auctions to helps bidders will be.'
                )
              }}
              title="?"
            >
              <Text>?</Text>
            </TouchableOpacity>
          </View>
          {console.log(displayAuction)}
          <View style={auctionStyles.selectionContainer}>
            {/* <Button btnText="Test bid" onPress={() => handleBid()} /> */}
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {/* temp auction id */}
              You are bidding on:{auctionID}
            </Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {/* may remove */}
              Starting Price: £{Number(start_price.start_price).toFixed(2)}
            </Text>

            <Text style={{ textAlign: 'center', color: 'white' }}>
              {film_title.film_title}, {convertTime(start_time.start_time)}
            </Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Seat selections: {seat_selection.selectedSeats.join(', ')}
            </Text>
          </View>
          <View style={auctionStyles.biddingInfoContainer}>
            <View style={auctionStyles.highestBidInfoContainer}>
              {/* {!highestBid ? (
                <View>
                  <Text style={{ textAlign: 'center' }}>Starting bid: </Text>
                  <Text style={{ textAlign: 'center', fontSize: 25 }}>£{startingPrice}</Text>
                </View>
              ):( */}
              <View>
                <Text style={{ textAlign: 'center' }}>
                  Current highest bid:{' '}
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 25 }}>
                  £{displayAuction.current_price || start_price.start_price}
                </Text>
              </View>
              {/* )} */}
              <Text style={{ textAlign: 'center' }}>
                Bidding counter: {displayAuction.bid_counter}
              </Text>
            </View>
            <View style={auctionStyles.otherBidInfoContainer}>
              <View
                style={[
                  auctionStyles.smallerBidInfoContainer,
                  { marginBottom: 5 },
                ]}
              >
                <Text>Highest bidder: (will do get request for the name)</Text>
                <Text style={{ fontSize: 25 }}>
                  {tempUser || displayAuction.current_highest_bidder}
                </Text>
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
          <View style={auctionStyles.biddingForm}>
            <Text style={{ marginRight: 5 }}></Text>
            <TextInput
              style={auctionStyles.bidInput}
              placeholder="Enter your bid here"
              onChangeText={(value) => setUserBid(value)}
              value={userBid}
              keyboardType="numeric"
            />
            {/* <TouchableOpacity title="submit" onPress={() => submitBid()}>
              <Text style={{ marginLeft: 10 }}>→</Text>
            </TouchableOpacity> */}
          </View>
          {!displayAuction.active ? (
            <View>
              <Button
                btnText="start auction"
                onPress={() => {
                  initiateAuction()
                }}
              />
            </View>
          ) : (
            <View>
              <Button
                btnText="place bid"
                onPress={() => {
                  handleNewBid(auctionID)
                }}
              />
            </View>
          )}
          <View style={auctionStyles.statusContainer}>
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {errorMessage}
            </Text>
          </View>
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
            {countdownStructure.ended && displayAuction.current_highest_bidder === currentCustomer.user_id && (
                <TouchableOpacity
                  title="ViewOrder"
                  onPress={() => navigation.navigate('PreviousOrders')}
                >
                  <Text>View your order</Text>
                </TouchableOpacity>
              )}
            {countdownStructure.ended && displayAuction.current_highest_bidder !== currentCustomer.user_id && (
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
