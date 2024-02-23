import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Button from '../helpers'
import { styles } from '../style-sheet'
import { getAllEventsByBusinessId } from '../utils'

function BusinessHomepage({ route }) {
  const { business_id } = route.params
  const [events, setEvents] = useState([])

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
      <Button
          btnText="Create new screening"
          onPress={() => navigation.navigate('BusinessCreateScreening')}
        />
    </View>
  )
}

export default BusinessHomepage
