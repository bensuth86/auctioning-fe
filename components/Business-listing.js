import { useState } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { SeatButton, Button } from '../helpers'
import { styles } from '../style-sheet'
import { seatStyles } from '../style-sheet-seats.js'
import { homeStyles } from '../style-sheet-customer-home.js'
import { useRoute } from '@react-navigation/native'
import { getBusinessById } from '../utils.js'
import { useEffect } from 'react'
import { postNewEvent } from '../utils.js'
import { Snackbar } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons'
import { isLoading } from 'expo-font'

function BusinessListing({ navigation }) {
  const route = useRoute()
  const { business_id, title, poster, runtime, certificate } = route.params
  const [seatingPlan, setSeatingPlan] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [price, setPrice] = useState(1)
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const today = new Date()

  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setSeatingPlan(response.seating_layout)
        setIsLoading(false)
      })
      .catch((err) => {
        setVisible(true)
        setSnackbarMessage('Failed to get business details. Please try again.')
      })
  }, [])

  function onChange(e, selectedDate) {
    setShow(false)
    setDate(selectedDate)
  }

  function showMode(modeToShow) {
    setMode(modeToShow)
    setShow(true)
  }

  const new_event = {
    film_title: title,
    poster: poster,
    certificate: certificate,
    run_time: runtime,
    start_time: date,
    available_seats: selectedSeats,
    start_price: price,
    business_id: business_id,
  }

  function handleListing() {
    setSubmitLoading(true)
    postNewEvent(new_event)
      .then(() => {
        setSubmitLoading(false)
        setVisible(true)
        setSnackbarMessage("Success! You've listed a new event.")
        navigation.navigate('BusinessHomepage', { business_id, success: true })
      })
      .catch((err) => {
        setSubmitLoading(false)
        setVisible(true)
        setSnackbarMessage('Error posting a new listing... please try again.')
      })
  }

  isLoading && (
    <View style={styles.container}>
      <ActivityIndicator color="red" size={'large'} />
    </View>
  )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        <View style={{ maxWidth: 300 }}>
          <Text
            style={{
              fontFamily: 'Comfortaa-Regular',
              fontSize: 20,
              color: '#f5f5f5',
              textAlign: 'center',
            }}
          >
            Listing for {'\n'}
            <Text style={{ fontFamily: 'Comfortaa-Bold' }}>{title}</Text>
          </Text>
        </View>
        <View style={{ marginTop: 10, width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {show === false ? (
              <Button
                btnText="CHOOSE DATE"
                onPress={() => showMode('date')}
              ></Button>
            ) : null}

            {show === false ? (
              <Button
                btnText="CHOOSE TIME"
                onPress={() => showMode('time')}
              ></Button>
            ) : (
              <Button btnText="CLOSE" onPress={() => setShow(false)}></Button>
            )}

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                display={'spinner'}
                is24HOUR={true}
                onChange={onChange}
                textColor="white"
              />
            )}
          </View>

          <Text
            style={{
              fontFamily: 'Comfortaa-Light',
              fontSize: 12,
              color: '#f5f5f5',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              You have chosen the following date:{'\n'}
            </Text>
            {date.toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                fontFamily: 'Comfortaa-Regular',
                color: '#f5f5f5',
                fontSize: 12,
              }}
            >
              Please select your starting price:
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={homeStyles.adjustments}
                onPress={() => setPrice((prevPrice) => prevPrice - 1)}
              >
                <AntDesign
                  name="minus"
                  size={24}
                  color="#f5f5f5"
                  accessibilityLabel="minus icon"
                />
              </TouchableOpacity>
              <TextInput
                value={`£${price.toString()}`}
                onChangeText={(text) => setPrice(parseInt(text) || 1)}
                keyboardType="numeric"
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: 20,
                  height: 40,
                  width: 80,
                  textAlign: 'center',
                }}
                selectionColor={'rgba(43, 29, 65, 0.1)'}
              />
              <TouchableOpacity
                style={homeStyles.adjustments}
                onPress={() => setPrice((prevPrice) => prevPrice + 1)}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color="#f5f5f5"
                  accessibilityLabel="addition icon"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 20,
                fontFamily: 'Comfortaa-Regular',
              }}
            >
              Please select all available seats:
            </Text>

            <View style={seatStyles.screen}>
              <Text style={seatStyles.screenText}>SCREEN</Text>
            </View>
            {seatingPlan.map((row, i) => {
              return (
                <View key={i} style={seatStyles.seatsContainer}>
                  <View key={i} style={seatStyles.rowContainer}>
                    {row.map((seat) => {
                      const isSelected = selectedSeats.includes(seat)
                      return (
                        <View key={seat}>
                          <SeatButton
                            seatStyle={
                              isSelected
                                ? seatStyles.availableSeatButton
                                : seatStyles.numberedSeatButton
                            }
                            key={seat}
                            btnText={seat}
                            onPress={() => {
                              {
                                isSelected
                                  ? setSelectedSeats(
                                      selectedSeats.filter(
                                        (item) => seat !== item
                                      )
                                    )
                                  : setSelectedSeats([...selectedSeats, seat])
                              }
                            }}
                          ></SeatButton>
                        </View>
                      )
                    })}
                  </View>
                </View>
              )
            })}
            <View style={{ marginTop: 10 }}>
              <View style={seatStyles.keyContainer}>
                <View
                  style={[seatStyles.seatKey, { backgroundColor: '#7bc47f' }]}
                ></View>
                <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 12 }}>
                  Available
                </Text>
              </View>

              <View style={seatStyles.keyContainer}>
                <View
                  style={[seatStyles.seatKey, { backgroundColor: '#626262' }]}
                ></View>
                <Text style={{ fontFamily: 'Comfortaa-Light', fontSize: 12 }}>
                  Unavailable
                </Text>
              </View>
            </View>
            {date < today.setMinutes(today.getMinutes() + 59) ? (
              <View>
                <Text
                  style={[
                    styles.error,
                    {
                      fontFamily: 'Comfortaa-Light',
                      textAlign: 'center',
                      margin: 20,
                    },
                  ]}
                >
                  You must set a date more than 1 hour in the future.
                </Text>
              </View>
            ) : selectedSeats.length > 0 && !submitLoading ? (
              <Button btnText={'LIST EVENT'} onPress={handleListing} />
            ) : submitLoading ? (
              <View>
                <ActivityIndicator color="red" size={'large'} />
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    styles.error,
                    {
                      fontFamily: 'Comfortaa-Light',
                      textAlign: 'center',
                      margin: 20,
                    },
                  ]}
                >
                  You must select at least one seat.
                </Text>
              </View>
            )}
          </View>
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
              label: 'Dismiss',
              onPress: () => setVisible(false),
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </ScrollView>
  )
}

export default BusinessListing
