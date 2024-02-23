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



function CustomerAuctionPage({ navigation, route }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
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
  } = route.params
  const [userBid, setUserBid] = useState('')
  const [highestBid, setHighestBid] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [beginAuction, setBeginAuction] = useState(false)
  const [auction_idPlaceholder, setauction_idPlaceholder] = useState(null)
  const [displayAuction, setDisplayAuction] = useState({
    active: false,
    auction_id: null,
    bid_counter: null,
    current_highest_bidder: null,
    current_price: null,
    event_id: null,
    seat_selection: null,
    time_ending: null,
    time_started: null,
    users_involved: null
  })
  const [newAuctionInfo, setNewAuctionInfo] = useState({
    event_id: null,
    seat_selection: [],
    current_price: null,
    user_id: null
  })

  useEffect(() => {
    if (beginAuction) {
      postNewAuction(newAuctionInfo).then((response) => {
        // console.log(response.data.auction.auction_id)
        getAuctionByAuctionId(response.data.auction.auction_id)
        .then((response) => {
          // console.log('active', response.data.auction.active)
          setBeginAuction(false)
          setDisplayAuction({
            active: response.data.auction.active,
            auction_id: response.data.auction.auction_id,
            bid_counter: response.data.auction.bid_counter,
            current_highest_bidder: response.data.auction.current_highest_bidder,
            current_price: response.data.auction.current_price,
            event_id: response.data.auction.event_id,
            seat_selection: response.data.auction.seat_selection,
            time_ending: response.data.auction.time_ending,
            time_started: response.data.auction.time_started,
            users_involved: response.data.auction.users_involved
          })
          updateBidOnAuction(displayAuction.auction_id, input).then((response) => {
            //currently changing auction id to a state instead of variable, and then switching the buttons (post/bid)
          })
        })
      })
    }
  }, [newAuctionInfo, beginAuction, displayAuction])

  const startingPrice = 3 // passed down as params from the event id (I think)
  const priceCap = startingPrice * 4 // multiply starting price by 4 (anything over will be blocked)
  let auction_id = null

  function submitBid() {
    if (isNaN(userBid)) {
      setErrorMessage(`Please enter a number.`)
    }
    if (userBid >= startingPrice && userBid <= priceCap && userBid > highestBid) {
      setHighestBid(`${userBid}`)
      setErrorMessage('')
    }
    if (userBid <= highestBid) {
      setErrorMessage(`You need to place a bid greater than £${highestBid}.`)
    }
    if (userBid < startingPrice) {
      setErrorMessage(`You need to place a minimum bid of £${startingPrice}.`)
    }
    if (userBid > priceCap) {
      setErrorMessage(`You have exceeded the price cap of this auction. Please enter an amount less than £${priceCap}.`)
    }
    setUserBid('')
  }

  function handleTextChange(text) {
    setUserBid(text)
  }

function initiateAuction() {
    setNewAuctionInfo({    
      event_id: Number(event_id.event_id),
      seat_selection: seat_selection.selectedSeats,
      current_price: Number(start_price.start_price),
      user_id: Number(currentCustomer.user_id)
    })
    setBeginAuction(true)
  }
      
  const socket = io('https://auctioning-be.onrender.com/')
  const [bid, setBid] = useState(1)

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected) // true
      console.log(`⚡: ${socket.id} user just connected!`)

    })
  }, [])
  socket.on('new bid', (new_bid) => {
    setBid(new_bid)
  })
  function handleBid() {
    socket.emit('new bid', bid + 1)
  }

  function updateBid() {
    console.log('will place bids')
  }

  return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={auctionStyles.container}>
          <View style={auctionStyles.auctionNavigation}>
            <TouchableOpacity
              title="backToSeating"
              onPress={() => navigation.navigate('SeatingPage', {
                //add params back to seating page - not currently working
              })}
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
          <View style={auctionStyles.selectionContainer}>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              You are bidding on:{' '}
            </Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              {film_title.film_title}, {start_time.start_time}
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
                  <Text style={{ textAlign: 'center' }}>Current highest bid: </Text>
                  <Text style={{ textAlign: 'center', fontSize: 25 }}>£{displayAuction.current_price}</Text>
                </View>
              {/* )} */}
              <Text style={{ textAlign: 'center' }}>Bidding counter: {displayAuction.bid_counter}</Text>
            </View>
            <View style={auctionStyles.otherBidInfoContainer}>
              <View
                style={[
                  auctionStyles.smallerBidInfoContainer,
                  { marginBottom: 5 },
                ]}
              >
                <Text>Highest bidder: (will do get request for the name)</Text>
                <Text style={{ fontSize: 25 }}>{displayAuction.current_highest_bidder}</Text>
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
              onChangeText={handleTextChange}
              value={userBid}
              keyboardType="numeric"
            />
            <TouchableOpacity title="submit" onPress={() => submitBid()}>
              <Text style={{ marginLeft: 10 }}>→</Text>
            </TouchableOpacity>
          </View>
          {!displayAuction.active ? (
          <View>
            <Button btnText='start auction' onPress={() => {initiateAuction()}}/>
          </View>
          ):(
            <View>
            <Button btnText='place bid' onPress={() => {updateBid()}}/>
          </View>
          )}
          <View style={auctionStyles.statusContainer}>
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {errorMessage}
            </Text>
          </View>
          <View style={auctionStyles.timerContainer}>
            <Text style={{ color: 'white' }}>Timer:</Text>
            <Text style={{ fontSize: 25, color: 'white' }}>20:00</Text>
          </View>
          <View style={auctionStyles.auctionResultButton}>
            {/* When a user looses an auction: */}
            {/* <TouchableOpacity 
              title="BackToHomepage"
              onPress={() => navigation.navigate('CustomerHomepage')}>
              <Text>Back to auctions</Text>
            </TouchableOpacity> */}
            {/* When a user wins an auction: */}
            {/* <TouchableOpacity
              title="ViewOrder"
              onPress={() => navigation.navigate('CustomerHomepage')}>
              <Text>View your order</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default CustomerAuctionPage
