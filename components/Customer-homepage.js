import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { eventStyles } from '../style-sheet-events'
import { getEventsByUserId } from '../utils'
import { EventsCard, UnavailableEventsCard } from './Customer-events-card'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { homeStyles } from '../style-sheet-customer-home'
import { TextInput } from 'react-native-paper'
import { CurrentAuction } from './Customer-current-auctions-section'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

function CustomerHomepage({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [eventsList, setEventsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [radius, setRadius] = useState(8)
  const [expandRadius, setExpandRadius] = useState(null)
  const [resultsLoad, setResultsLoad] = useState(false)

  useEffect(() => {
    setResultsLoad(true)

    getEventsByUserId(currentCustomer.user_id, expandRadius)
      .then((response) => {
        setEventsList(response)
        setIsLoading(false)
        setResultsLoad(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setResultsLoad(false)

        if (err.response.data.msg === 'User not found.') {
          setErrorMessage(
            'Sorry - your user ID does not exist.\nCannot fetch search results.'
          )
        }
        if (err.response.data.msg === 'Bad request') {
          setErrorMessage(
            'Sorry - your user ID is invalid.\nCannot fetch search results.'
          )
        }
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
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" size={'large'} />
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
                textAlign: 'center',
              }}
            >
              SEARCH FOR SCREENINGS
            </Text>
            {errorMessage !== '' && (
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}
              >
                <Text style={styles.error}>{errorMessage}</Text>
              </View>
            )}
            {errorMessage === '' && (
              <>
                <View style={homeStyles.radiusContainer}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Comfortaa-Regular',
                    }}
                  >
                    Adjust radius:{' '}
                  </Text>
                  <View style={homeStyles.radiusSelection}>
                    <TouchableOpacity
                      style={homeStyles.adjustments}
                      onPress={decreaseRadius}
                    >
                      <AntDesign
                        name="minus"
                        size={24}
                        color="black"
                        accessibilityLabel="minus icon"
                      />
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
                      <AntDesign
                        name="plus"
                        size={24}
                        color="black"
                        accessibilityLabel="addition icon"
                      />
                    </TouchableOpacity>
                  </View>
                  <Button btnText={'SUBMIT'} onPress={() => submitRadius()} />
                </View>
                {resultsLoad ? (
                  <View
                    style={{
                      height: 600,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator color="red" size={'large'} />
                  </View>
                ) : (
                  <>
                    {!expandRadius ? (
                      <Text style={homeStyles.resultsIntro}>
                        {eventsList.length} screenings for auction with an 8
                        mile radius of {currentCustomer.postcode}:
                      </Text>
                    ) : (
                      <Text style={homeStyles.resultsIntro}>
                        {eventsList.length} screenings for auction with a{' '}
                        {expandRadius} mile radius of {currentCustomer.postcode}
                        :{' '}
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
                        return availableSeats > 0 ? (
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
                        )
                      })}
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default CustomerHomepage
