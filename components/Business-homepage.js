import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
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

function BusinessHomepage({ navigation, route }) {
  const { business_id, success } = route.params
  const [events, setEvents] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [businessInfo, setBusinessInfo] = useState({
    business_name: null,
    postcode: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [seatingPlan, setSeatingPlan] = useState([])
  const [active, setActive] = useState(true)

  useEffect(() => {
    getAllEventsByBusinessId(business_id, active)
      .then((response) => {
        
        setEvents(response.data.events)
        setSeatingPlan(response.available_seats)
        getBusinessById(business_id).then((response) => {
          setBusinessInfo({
            business_name: response.business_name,
            postcode: response.postcode,
          })
          setIsLoading(false)
        })
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.msg === 'Bad request') {
          setErrorMessage(
            'Sorry - your business ID is invalid.\nCannot fetch your listings.'
          )
        }
      })
  }, [events, business_id])

  function logUserOut() {
    navigation.navigate('Welcome_page')
  }

  function handlePressPast() {
    setActive(false)
    setIsLoading(true)
  }
  function handlePressActive() {
    setActive(true)
    setIsLoading(true)
  }

  if (isLoading)
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" />
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        <View style={{margin: 20}}>
          <Pressable style={styles.backButton}>
            <Text style={styles.backButtonText} onPress={() => logUserOut()}>
              SIGN OUT
            </Text>
          </Pressable>
        </View>
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
            <View style={{marginTop: 30}}>
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
              <Text
                style={{
                  fontFamily: 'Comfortaa-Regular',
                  color: '#f5f5f5',
                  fontSize: 16,
                  textAlign: 'center',
                  marginTop: 40,
                  marginBottom: 40,
                }}
              >
                Thanks {businessInfo.business_name}, we've created a new listing
                for you.
              </Text>
            ) : null}
            {active ? (
            <Text
              style={{
                fontFamily: 'Comfortaa-Light',
                color: '#f5f5f5',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              Here are your active events{'\n'}at location <Text style={{fontFamily: 'Comfortaa-Bold'}}>{businessInfo.postcode}</Text>:
            </Text>

            ):(
              <Text
              style={{
                fontFamily: 'Comfortaa-Light',
                color: '#f5f5f5',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              Here are your past events{'\n'}at location <Text style={{fontFamily: 'Comfortaa-Bold'}}>{businessInfo.postcode}</Text>:
            </Text>
            )}
            <View style={eventStyles.eventcard}>
              {!events.length && (
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Regular',
                    color: '#f5f5f5',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 40,
                    marginBottom: 40,
                    color: 'red'
                  }}
                >
                  Sorry, no events to show!
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
                            />
                          }{' '}
                          £{Number(event.start_price).toFixed(2)}
                        </Text>
                      </Text>
                      <Text style={orderHistory.sideInfoHeaders}>
                        Screening date:{'\n'}
                        <Text style={orderHistory.info}>
                          <Fontisto name="date" size={12} color="#f5f5f5" />{' '}
                          {convertTime(event.start_time)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default BusinessHomepage
