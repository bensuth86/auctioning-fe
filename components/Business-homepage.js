import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Button from '../helpers'
import { styles } from '../style-sheet'
import { getAllEventsByBusinessId } from '../utils'

function BusinessHomepage({ navigation, route }) {
  const { business_id } = route.params
  console.log(business_id)
  const [events, setEvents] = useState([])
  console.log(events)
  useEffect(() => {
    getAllEventsByBusinessId(business_id)
      .then((response) => {
        setEvents(response.data.events)
      })
      .catch((error) => {
        console.error('Error fetching events:', error)
      })
  }, [business_id])

  return (
    <View style={styles.container}>
      <Text>Hello, it's Business Homepage :D</Text>
      <Text>Events for Business ID: {business_id}</Text>
      <View>
        {events.map((event) => (
          <Text key={event.event_id}>{event.film_title}</Text>
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
  )
}

export default BusinessHomepage
