import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Button from '../helpers'
import { styles } from '../style-sheet'
import { getAllEventsByBusinessId } from '../utils'
import { eventStyles } from '../style-sheet-events'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { convertTime } from '../helpers'
import { ScrollView } from 'react-native-web'

function BusinessHomepage({ navigation, route }) {
  const { business_id } = route.params
  const [events, setEvents] = useState([])

  const [seatingPlan, setSeatingPlan] = useState([])

  useEffect(() => {
    getAllEventsByBusinessId(business_id)
      .then((response) => {
        setEvents(response.data.events)
        setSeatingPlan(response.available_seats)
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
      })
  }, [business_id])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

    <View style={styles.container}>
      <Text>Events for Business ID: {business_id}</Text>
      <View style={eventStyles.eventcard}>
        {events.map((event) => (
          <View key={event.event_id} style={eventStyles.eventcard}>
            <View style={eventStyles.mainContent}>
              <Image
                source={{ uri: event.poster }}
                style={{ width: 130, height: 180.5 }}
              />
              <View style={eventStyles.rightSide}>
                <Text style={eventStyles.cardHeader}>{event.film_title}</Text>
                <Text style={eventStyles.cardText}>
                  <AntDesign name="clockcircleo" size={16} color="black" />{' '}
                  {event.run_time} minutes
                </Text>
                <Text style={eventStyles.cardText}>
                  <Fontisto name="date" size={16} color="black" />{' '}
                  {convertTime(event.start_time)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('BusinessCreateScreening', {
            business_id,
          })
        }
      >
        <Text style={styles.buttonText}>Create Screening</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>

  )
}

export default BusinessHomepage
