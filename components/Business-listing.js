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

function BusinessListing(navigation) {
  const route = useRoute()
  const business_id = route.params.business_id
  const [seatingPlan, setSeatingPlan] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(1)
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    getBusinessById(business_id)
      .then((response) => {
        setSeatingPlan(response.seating_layout)
      })
      .catch((err) => {
        console.error(err)
        setSnackbarMessage('Failed to get seating plan. Please try again.')
      })
  }, [business_id])

  function onChange(e, selectedDate) {
    setDate(selectedDate)
  }

  function increasePrice() {
    setPrice((prevPrice) => prevPrice + 1)
  }

  function decreasePrice() {
    if (price > 1) {
      setPrice((prevPrice) => prevPrice - 1)
    }
  }

  // console.log(price)
  // console.log(selectedSeats)
  // console.log(date)

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
          <DateTimePicker
            value={date}
            mode={'date'}
            is24HOUR={true}
            onChange={onChange}
          />
          <DateTimePicker
            value={date}
            mode={'time'}
            is24HOUR={true}
            onChange={onChange}
          />
          <Text>{date.toLocaleString()}</Text>
          <View style={homeStyles.radiusSelection}>
            <Text>Please select your starting price:</Text>
            <Button btnText={'-'} onPress={decreasePrice} />
            <TextInput
              value={price.toString()}
              onChangeText={(text) =>
                setPrice((`£` && parseInt(text)) || (`£` && 1))
              }
              keyboardType="numeric"
              style={homeStyles.numberDial}
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
        {selectedSeats.length > 0 ? (
          <Button
            key={'listeventbtn'}
            btnText="List event"
            onPress={() => {
              navigation.navigate('BusinessHomepage')
            }}
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

export default BusinessListing
