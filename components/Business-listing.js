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

function BusinessListing({ navigation }) {
  const route = useRoute()
  const { business_id, title, poster, runtime, certificate } = route.params
  const [seatingPlan, setSeatingPlan] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(1)
  const [date, setDate] = useState(new Date())
  const [err, setErr] = useState(null)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setSeatingPlan(response.seating_layout)
      })
      .catch((err) => {
        console.error(err)
        setVisible(true)
        setSnackbarMessage('Failed to get seating plan. Please try again.')
      })
  }, [business_id])

  function onChange(e, selectedDate) {
    setDate(selectedDate)
    setShow(false)
  }

  function increasePrice() {
    setPrice((prevPrice) => prevPrice + 1)
  }

  function decreasePrice() {
    if (price > 1) {
      setPrice((prevPrice) => prevPrice - 1)
    }
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
    postNewEvent(new_event)
      .then(() => {
        setVisible(false)
        setSnackbarMessage("Success! You've listed a new event.")
        navigation.navigate('BusinessHomepage', { business_id })
      })
      .catch((err) => {
        setVisible(true)
        setSnackbarMessage('Error posting a new listing... please try again.')
        console.log(err)
      })
  }

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ maxWidth: 300 }}>
          <Text>Listing for {title}</Text>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          {show === false ? (
            <Button
              btnText="Choose Date"
              onPress={() => showMode('date')}
            ></Button>
          ) : null}

          {show === false ? (
            <Button
              btnText="Choose Time"
              onPress={() => showMode('time')}
            ></Button>
          ) : (
            <Button btnText="Close" onPress={() => setShow(false)}></Button>
          )}

          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              display={'spinner'}
              is24HOUR={true}
              onChange={onChange}
            />
          )}
          {date < new Date() ? (
            <Text>Please select a date</Text>
          ) : (
            <Text>You have chosen date: {date.toLocaleString()}</Text>
          )}

          <View style={homeStyles.radiusSelection}>
            <Text>Please select your starting price:</Text>
            <Button btnText={'-'} onPress={decreasePrice} />
            <TextInput
              value={`£${price.toString()}`}
              onChangeText={(text) => setPrice(parseInt(text) || 1)}
              keyboardType="numeric"
              style={homeStyles.numberDial}
              selectionColor={'rgba(43, 29, 65, 0.1)'}
            />
            <Button btnText={'+'} onPress={increasePrice} />
          </View>
          <Text
            style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}
          >
            Please select all available seats:
          </Text>
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
        </View>
        <View style={seatStyles.screen}>
          <Text style={seatStyles.screenText}>SCREEN</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={seatStyles.keyContainer}>
            <View
              style={[seatStyles.seatKey, { backgroundColor: '#7bc47f' }]}
            ></View>
            <Text>Available</Text>
          </View>

          <View style={seatStyles.keyContainer}>
            <View
              style={[seatStyles.seatKey, { backgroundColor: '#626262' }]}
            ></View>
            <Text>Unavailable</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Selection instructions',
              'This is where all of the info for seat selections will be.'
            )
          }}
          title="?"
        >
          <Text>?</Text>
        </TouchableOpacity>
        {date < new Date() ? (
          <View style={seatStyles.errorContainer}>
            <Text style={seatStyles.textbox}>
              You cannot select a date in the past.
            </Text>
          </View>
        ) : selectedSeats.length > 0 ? (
          <Button btnText={'List event'} onPress={handleListing} />
        ) : (
          <View style={seatStyles.errorContainer}>
            <Text style={seatStyles.textbox}>
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
    </ScrollView>
  )
}

export default BusinessListing
