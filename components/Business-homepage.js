import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from '../style-sheet'
import { getAllEventsByBusinessId, getBusinessById } from '../utils'
import { eventStyles } from '../style-sheet-events'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { convertTime } from '../helpers'
import { ScrollView } from 'react-native'
import { Button } from '../helpers'
import { ActivityIndicator } from 'react-native-paper'
import { Pressable } from 'react-native'
import { orderHistory } from '../style-sheet-previous-orders'
import { useIsFocused } from '@react-navigation/native'

function BusinessHomepage({ navigation, route }) {
  const { business_id, success } = route.params
  const [events, setEvents] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [eventLoading, setEventLoading] = useState(true)
  const [businessInfo, setBusinessInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [active, setActive] = useState(true)
  const isFocused = useIsFocused()

  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setBusinessInfo({
          business_name: response.business_name,
          postcode: response.postcode,
        })
        setIsLoading(false)
      })
      .then(() => {
        getAllEventsByBusinessId(business_id, active).then((response) => {
          setErrorMessage('')
          setEvents(response.data.events)
          setEventLoading(false)
        })
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.response.data.msg === 'Invalid business ID') {
          setErrorMessage(
            'Sorry - Something went wrong fetching your listings.'
          )
        }
        if (err.response.data.msg === 'Business not found.') {
          setErrorMessage(
            'Sorry - your business ID does not exist.\nCannot fetch your listings.'
          )
        }
      })
  }, [active, isFocused])

  function logUserOut() {
    navigation.navigate('Welcome_page')
  }

  function handlePressPast() {
    setActive(false)
    setEventLoading(true)
  }
  function handlePressActive() {
    setActive(true)
    setEventLoading(true)
  }

  if (isLoading)
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" size={'large'} />
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
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
            <View style={{ margin: 20 }}>
              <Pressable style={styles.backButton}>
                <Text
                  style={styles.backButtonText}
                  onPress={() => logUserOut()}
                >
                  SIGN OUT
                </Text>
              </Pressable>
            </View>
            <Text
              style={{
                fontFamily: 'Comfortaa-Regular',
                color: '#f5f5f5',
                fontSize: 20,
                textAlign: 'center',
              }}
            >
              HELLO {businessInfo.business_name}!
            </Text>
            <View style={{ marginTop: 30 }}>
              <Button
                btnText={'CREATE SCREENING'}
                onPress={() =>
                  navigation.navigate('BusinessCreateScreening', {
                    business_id,
                  })
                }
              />
              {active ? (
                <Button
                  btnText={'SEE PAST SCREENINGS'}
                  onPress={handlePressPast}
                ></Button>
              ) : (
                <Button
                  btnText={'SEE ACTIVE SCREENINGS'}
                  onPress={handlePressActive}
                ></Button>
              )}
            </View>
            {success === true ? (
              <View
                style={{
                  backgroundColor: '#413454',
                  margin: 10,
                  marginTop: 20,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Regular',
                    color: '#f5f5f5',
                    fontSize: 16,
                    textAlign: 'center',
                    padding: 10,
                  }}
                >
                  Thanks {businessInfo.business_name}, we've created a new
                  listing for you.
                </Text>
              </View>
            ) : null}

            <Text
              style={{
                fontFamily: 'Comfortaa-Light',
                color: '#f5f5f5',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 40,
                lineHeight: 26.5,
              }}
            >
              Here are your {active ? 'active' : 'past'} events{'\n'}at location{' '}
              <Text style={{ fontFamily: 'Comfortaa-Bold' }}>
                {businessInfo.postcode}
              </Text>
              :
            </Text>
            {eventLoading ? (
              <View style={{ flex: 1 }}>
                <ActivityIndicator color="red" size={'large'} />
              </View>
            ) : (
              <View style={eventStyles.eventcard}>
                {!events.length && active && (
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Regular',
                      color: '#f5f5f5',
                      fontSize: 12,
                      textAlign: 'center',
                      marginTop: 40,
                      marginBottom: 40,
                      color: 'red',
                      lineHeight: 20,
                    }}
                  >
                    You do not have any events listed.{'\n'}Create a new listing
                    with the button above!
                  </Text>
                )}
                {!events.length && !active && (
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Regular',
                      color: '#f5f5f5',
                      fontSize: 12,
                      textAlign: 'center',
                      marginTop: 40,
                      marginBottom: 40,
                      color: 'red',
                      lineHeight: 20,
                    }}
                  >
                    You do not have any past events.
                  </Text>
                )}

                {events.map((event) => (
                  <View key={event.event_id} style={eventStyles.eventcard}>
                    <Text style={orderHistory.cardHeader}>
                      <Text style={orderHistory.cardHeaderBold}>
                        {event.film_title}, {event.certificate}
                      </Text>
                    </Text>
                    <View style={eventStyles.mainContent}>
                      <Image
                        source={{ uri: event.poster }}
                        style={{ width: 150.5, height: 230 }}
                        accessibilityLabel={`${event.film_title} poster`}
                      />
                      <View style={eventStyles.rightSide}>
                        {event.available_seats.length === 0 ? (
                          <Text style={orderHistory.sideInfoHeaders}>
                            Seats left:{'\n'}
                            <Text style={orderHistory.info}>sold out!</Text>
                          </Text>
                        ) : (
                          <Text style={orderHistory.sideInfoHeaders}>
                            Seats left:{'\n'}
                            <Text style={orderHistory.info}>
                              {event.available_seats.length}
                            </Text>
                          </Text>
                        )}
                        <Text style={orderHistory.sideInfoHeaders}>
                          Run time:{'\n'}
                          <Text style={orderHistory.info}>
                            <AntDesign
                              name="clockcircleo"
                              size={12}
                              color="#f5f5f5"
                              accessibilityLabel="clock icon"
                            />{' '}
                            {event.run_time} minutes
                          </Text>
                        </Text>
                        <Text style={orderHistory.sideInfoHeaders}>
                          Starting price:{'\n'}
                          <Text style={orderHistory.info}>
                            {
                              <FontAwesome5
                                name="money-bill-wave"
                                size={12}
                                color="#f5f5f5"
                                accessibilityLabel="cash note icon"
                              />
                            }{' '}
                            £{Number(event.start_price).toFixed(2)}
                          </Text>
                        </Text>
                        <Text style={orderHistory.sideInfoHeaders}>
                          Screening date:{'\n'}
                          <Text style={orderHistory.info}>
                            <Fontisto
                              name="date"
                              size={12}
                              color="#f5f5f5"
                              accessibilityLabel="calendar icon"
                            />{' '}
                            {convertTime(event.start_time)}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default BusinessHomepage
