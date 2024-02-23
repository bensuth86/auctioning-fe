import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { auctionStyles } from '../auction-stylesheet'
import { TextInput } from 'react-native'
import { io } from 'socket.io-client'
import { Button } from '../helpers'

function CustomerAuctionPage({ navigation }) {
  const socket = io('https://auctioning-be.onrender.com/')

  ///api/auctions/event/:event_id
  // {
  //   "auction_id": 5,
  //   "event_id": 10,
  //   "seat_selection": [
  //   "B1",
  //   "B2"
  //   ],
  //   "current_price": "5",
  //   "time_started": "2024-02-22T12:02:02.472Z",
  //   "time_ending": "2024-03-08T11:03:02.472Z",
  //   "current_highest_bidder": 7,
  //   "users_involved": [
  //   1,
  //   2
  //   ],
  //   "active": true,
  //   "bid_counter": 4
  //   }

  const [userBid, setUserBid] = useState('')
  const [highestBid, setHighestBid] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected) // true
      console.log(`⚡: ${socket.id} user just connected!`)
    })
  }, [])
  socket.on('new bid', (bid) => {
    setHighestBid(bid)
  })
  const startingPrice = 3 // passed down as params from the event id (I think)
  const priceCap = startingPrice * 4 // multiply starting price by 4 (anything over will be blocked)
  const seatingSelection = ['A1', 'A2', 'A3'] // passed down as params from the event id (I think) - used as length to calculate overall ticket price
  const biddingCounter = 0

  function submitBid() {
    if (isNaN(userBid)) {
      setErrorMessage(`Please enter a number.`)
    }
    if (
      userBid >= startingPrice &&
      userBid <= priceCap &&
      userBid > highestBid
    ) {
      setHighestBid(`${userBid}`)
      setErrorMessage('')
      socket.emit('new bid', userBid)
    }
    if (userBid <= highestBid) {
      setErrorMessage(`You need to place a bid greater than £${highestBid}.`)
    }
    if (userBid < startingPrice) {
      setErrorMessage(`You need to place a minimum bid of £${startingPrice}.`)
    }
    if (userBid > priceCap) {
      setErrorMessage(
        `You have exceeded the price cap of this auction. Please enter an amount less than £${priceCap}.`
      )
    }
    setUserBid('')
  }

  function handleTextChange(text) {
    setUserBid(text)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={auctionStyles.container}>
          <View style={auctionStyles.auctionNavigation}>
            <TouchableOpacity
              title="backToSeating"
              onPress={() => navigation.navigate('SeatingPage')}
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
            <Button btnText="Test bid" onPress={() => handleBid()} />
            <Text style={{ textAlign: 'center', color: 'white' }}>
              You are bidding on:{' '}
            </Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Film name, date (all film info)
            </Text>
            <Text style={{ textAlign: 'center', color: 'white' }}>
              Seat selections: {seatingSelection.join(', ')}
            </Text>
          </View>
          <View style={auctionStyles.biddingInfoContainer}>
            <View style={auctionStyles.highestBidInfoContainer}>
              {!highestBid ? (
                <View>
                  <Text style={{ textAlign: 'center' }}>Starting bid: </Text>
                  <Text style={{ textAlign: 'center', fontSize: 25 }}>
                    £{startingPrice}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{ textAlign: 'center' }}>
                    Current highest bid:{' '}
                  </Text>
                  <Text style={{ textAlign: 'center', fontSize: 25 }}>
                    £{highestBid}
                  </Text>
                </View>
              )}
              <Text style={{ textAlign: 'center' }}>
                Bidding counter: {biddingCounter}
              </Text>
            </View>
            <View style={auctionStyles.otherBidInfoContainer}>
              <View
                style={[
                  auctionStyles.smallerBidInfoContainer,
                  { marginBottom: 5 },
                ]}
              >
                <Text>Highest bidder: </Text>
                <Text style={{ fontSize: 25 }}>username</Text>
              </View>
              <View
                style={[
                  auctionStyles.smallerBidInfoContainer,
                  { marginTop: 5 },
                ]}
              >
                <Text>Your bidding status: </Text>
                <Text style={{ fontSize: 25 }}>Status</Text>
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
