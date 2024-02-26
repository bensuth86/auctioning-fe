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
import { EventsCard, UnavailableEventsCard } from './Customer-events-card'
import CustomerSeating from './Customer-seating-selection'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { homeStyles } from '../style-sheet-customer-home'
import { TextInput } from 'react-native-paper'
import { userLocation } from '../utils'
import { CurrentAuction } from './Customer-current-auctions-section'
import { useFonts } from 'expo-font'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
// import { TouchableOpacity } from 'react-native-web'

function CustomerHomepage({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)

  const [eventsList, setEventsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [radius, setRadius] = useState(8)
  const [expandRadius, setExpandRadius] = useState(null)
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })

  useEffect(() => {
    getEventsByUserId(currentCustomer.user_id, expandRadius).then(
      (response) => {
        setEventsList(response)
        setIsLoading(false)
      }
    )
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

  // if (!fontsLoaded) {
  //   return undefined
  // }

  if (isLoading)
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" />
      </View>
    )

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.darkContainer}>
          <View style={homeStyles.navigation}>
            <View style={homeStyles.topNavigation}>
              <Pressable style={styles.backButton}>
                <Text
                  style={styles.backButtonText}
                  onPress={() => logUserOut()}
                >
                  SIGN OUT
                </Text>
              </Pressable>
              {/* <Text>HELLO {currentCustomer.username}</Text> */}
              {/* <Button btnText={'Log out'} onPress={() => logUserOut()} /> */}
            </View>
            <View style={styles.topNavStrip}></View>
            <View style={homeStyles.greetingsOrders}>
              <Text
                style={{
                  fontFamily: 'Comfortaa-Regular',
                  color: '#f5f5f5',
                  fontSize: 20,
                }}
              >
                HELLO {currentCustomer.username}
              </Text>
              <Button
                btnText={'VIEW ORDERS'}
                onPress={() => navigation.navigate('PreviousOrders')}
              />
            </View>
            <CurrentAuction navigation={navigation} />
          </View>
          <View style={homeStyles.contrastContainer}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Comfortaa-Regular',
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 40,
                paddingRight: 40,
                textAlign: 'center'
              }}
            >
              SEARCH FOR SCREENINGS
            </Text>
            <View style={homeStyles.radiusContainer}>
              <Text
                style={{ textAlign: 'center', fontFamily: 'Comfortaa-Regular' }}
              >
                Adjust radius:{' '}
              </Text>
              <View style={homeStyles.radiusSelection}>
                <TouchableOpacity
                  style={homeStyles.adjustments}
                  onPress={decreaseRadius}
                >
                  <AntDesign name="minus" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  value={radius.toString()}
                  onChangeText={(text) => setRadius(parseInt(text) || 8)}
                  keyboardType="numeric"
                  style={homeStyles.numberDial}
                />
                <TouchableOpacity
                  style={homeStyles.adjustments}
                  onPress={increaseRadius}
                >
                  <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Button btnText={'SUBMIT'} onPress={() => submitRadius()} />
            </View>
            {!expandRadius ? (
              <Text style={homeStyles.resultsIntro}>
                All screenings for auction within an 8 mile radius of{' '}
                {currentCustomer.postcode}:{' '}
              </Text>
            ) : (
              <Text style={homeStyles.resultsIntro}>
                All screenings for auction within an {expandRadius} mile radius
                of {currentCustomer.postcode}:{' '}
              </Text>
            )}
            {eventsList.length === 0 && (
              <View style={homeStyles.noResults}>
                <Text style={homeStyles.noResultsText}>
                  There are currently no auctions near you.
                </Text>
                <Text style={homeStyles.noResultsText}>
                  Try again later, or increase your radius for a wider
                  selection.
                </Text>
              </View>
            )}
            <View style={eventStyles.eventslist}>
              {eventsList.map((event, i) => {
                const availableSeats = event.available_seats.length
                return (
                  <>
                    {availableSeats > 0 ? (
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
                    ) : (
                      <UnavailableEventsCard key={i} event={event} />
                    )}
                  </>
                )
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default CustomerHomepage
