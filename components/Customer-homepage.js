/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// const postcodes = require('node-postcodes.io')
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { eventStyles } from '../style-sheet-events'
import { getEventsByUserId } from '../utils'
import EventsCard from './Customer-events-card'
import CustomerSeating from './Customer-seating-selection'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { homeStyles } from '../style-sheet-customer-home'
import { TextInput } from 'react-native-paper'
import { userLocation } from '../utils'
import { CurrentAuction } from './Customer-current-auctions-section'

function CustomerHomepage({ navigation }) {
  
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)

  const [eventsList, setEventsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [radius, setRadius] = useState(8)
  const [expandRadius, setExpandRadius] = useState(null)

  useEffect(() => {
    getEventsByUserId(currentCustomer.user_id, expandRadius).then((response) => {
      setEventsList(response)
      setIsLoading(false)
    })
  }, [currentCustomer.user_id, expandRadius])

  function logUserOut() {
    navigation.navigate('Welcome_page')
    setCurrentCustomer({ username: null, user_id: null, postcode: null })
  }

  function increaseRadius() {
    setRadius((prevRadius) => prevRadius + 1)
  }

  function decreaseRadius() {
    if (radius >= 9) {
      setRadius((prevRadius) => prevRadius - 1)
    }
  }

  function submitRadius() {
    setExpandRadius(radius)
  }

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )

  return (<>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={homeStyles.navigation}>
          <View style={homeStyles.topNavigation}>
            <Text>Hello {currentCustomer.username}</Text>
            <Button btnText={'Log out'} onPress={() => logUserOut()} />
          </View>
          <View>
          <Button btnText={'View previous orders'} onPress={() => navigation.navigate('PreviousOrders')} />
          </View>
          <Text style={{textAlign: 'center'}}>Adjust radius: </Text>
          <View style={homeStyles.radiusSelection}>
            <Button btnText={'-'} onPress={decreaseRadius} />
            <TextInput
              value={radius.toString()}
              onChangeText={(text) => setRadius(parseInt(text) || 8)}
              keyboardType="numeric"
              style={homeStyles.numberDial}
            />
            <Button btnText={'+'} onPress={increaseRadius} />
            <Button btnText={'submit radius'} onPress={() => submitRadius()}/>
          </View>
          <CurrentAuction/>
        </View>
          {!expandRadius ? (
            <Text style={homeStyles.resultsIntro}>Showing all cinema events for auctions within an 8 mile radius of {currentCustomer.postcode}: </Text>
            ):(
            <Text style={homeStyles.resultsIntro}>Showing all cinema events for auctions within a {expandRadius} mile radius of {currentCustomer.postcode}: </Text>
          )}
        <View style={eventStyles.eventslist}>
          {eventsList.map((event, i) => {
            // console.log('event: ', event)
            return (
              <TouchableOpacity
              key={i}
                onPress={() =>
                  navigation.navigate('SeatingPage', {
                    event_id: event.event_id,
                    business_id: event.business_id,
                    start_price: event.start_price,
                    active: event.active,
                    available_seats: event.available_seats,
                    start_time: event.start_time,
                    film_title: event.film_title,
                    poster: event.poster,
                    run_time: event.run_time,
                    certificate: event.certificate,
                  })
                }
              >
                <EventsCard key={event.event_id} event={event} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ScrollView></>
  )
}

export default CustomerHomepage
