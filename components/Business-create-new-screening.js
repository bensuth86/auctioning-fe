import { generateSeatGrid } from '../helpers'
import { useState } from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native-web'
import { SeatButton, Button } from '../helpers'
import { styles } from '../style-sheet'
import { seatStyles } from '../style-sheet-seats.js'
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
          <View>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Please select all available seats:
            </Text>
          </View>

          {seatingPlan.map((row, i) => {
            return (
              <View key={i}>
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
