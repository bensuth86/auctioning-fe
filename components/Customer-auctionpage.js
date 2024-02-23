import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { auctionStyles } from '../auction-stylesheet'
import { TextInput } from 'react-native'
import { io } from 'socket.io-client'
import { Button } from '../helpers'

function CustomerAuctionPage({ navigation }) {
  const socket = io('https://auctioning-be.onrender.com/')
  const [bid, setBid] = useState(1)

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected) // true
      console.log(`⚡: ${socket.id} user just connected!`)
    })
  }, [])
  socket.on('chat message', (msg) => {
    setBid(msg)
  })
  function handleBid() {
    socket.emit('chat message', bid + 1)
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
              Seat selection
            </Text>
          </View>
          <View style={auctionStyles.biddingInfoContainer}>
            <View style={auctionStyles.highestBidInfoContainer}>
              <Text style={{ textAlign: 'center' }}>Current highest bid: </Text>
              <Text style={{ textAlign: 'center', fontSize: 25 }}>{bid}</Text>
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
            <Text style={{ marginRight: 5 }}>£</Text>
            <TextInput
              style={auctionStyles.bidInput}
              placeholder="Enter your bid here"
            />
            <TouchableOpacity title="submit">
              <Text style={{ marginLeft: 10 }}>→</Text>
            </TouchableOpacity>
          </View>
          <View style={auctionStyles.statusContainer}>
            <Text style={{ textAlign: 'center' }}>
              status messages (errors etc...)
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
