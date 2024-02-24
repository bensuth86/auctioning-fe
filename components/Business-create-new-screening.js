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

//accepts user input from signup
// const [availableSeats, setAvailableSeats] = useState([]) // PATCH /api/events/event_id (available_seats)
function BusinessCreateScreening() {
  const seatingPlan = [
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['D1', 'D2', 'D3'],
  ]
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(1)
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')

  //patch with changePrice

  function onChange(e, selectedDate) {
    setDate(selectedDate)
    setShow(false)
  }
  function showMode(modeToShow) {
    setShow(true)
    setMode(modeToShow)
  }

  function increasePrice() {
    setPrice((prevPrice) => prevPrice + 1)
  }

  function decreasePrice() {
    if (price > 1) {
      setPrice((prevPrice) => prevPrice - 1)
    }
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
        <View style={{ maxWidth: 300 }}></View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button onPress={() => showMode('date')} btnText={"Choose Date"} />
          <Button onPress={() => showMode('time')} btnText={"Choose Time"} />
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24HOUR={true}
              onChange={onChange}
            />
          )}
          <View style={homeStyles.radiusSelection}>
            <Text>Please select your starting price:</Text>
            <Button btnText={"-"} onPress={decreasePrice} />
            <TextInput
              value={price.toString()}
              onChangeText={(text) =>
                setPrice((`£` && parseInt(text)) || (`£` && 1))
              }
              keyboardType="numeric"
              style={homeStyles.numberDial}
            />
            <Button btnText={"+"} onPress={increasePrice} />
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
        {selectedSeats.length > 0 ? (
          <Button
            key={'listeventbtn'}
            btnText="List event"
            onPress={() =>
              navigation.navigate('BusinessHomepage', {
                business_id: { business_id },
              })
            }
          />
        ) : (
          <View style={seatStyles.errorContainer}>
            <Text style={seatStyles.textbox}>
              You must select at least one seat.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default BusinessCreateScreening
