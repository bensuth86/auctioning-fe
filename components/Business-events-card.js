import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../style-sheet'
import { eventStyles } from '../style-sheet-events'
import { convertTime } from '../helpers'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'





export function EventsCard({ event }) {
    return (
      <View style={eventStyles.eventcard}>
        <Text style={eventStyles.cardHeader}>
          {event.film_title},{' '}
          <Text style={{ fontWeight: 'normal' }}>{event.certificate}</Text>
        </Text>
        <View style={eventStyles.mainContent}>
          <Image
            style={{ width: 130, height: 180.5 }}
            source={{ uri: event.poster }}
            accessibilityLabel={`${event.film_title} poster`}
            />
          <View style={eventStyles.rightSide}>
            <Text>
              {event.business_name}, {event.postcode}
            </Text>
            <Text style={eventStyles.cardText}>
              {<FontAwesome5 name="map-marker-alt" size={16} color="black" accessibilityLabel="map marker icon"/>}{' '}
              {event.distance_in_miles.toFixed(2)} miles
            </Text>
            <Text style={eventStyles.cardText}>
              <AntDesign name="clockcircleo" size={16} color="black" accessibilityLabel="clock icon"/>{' '}
              {event.run_time} minutes
            </Text>
            <Text style={eventStyles.cardText}>
              {<FontAwesome5 name="money-bill-wave" size={16} color="black" accessibilityLabel="cash note icon"/>}{' '}
              Starting from £{Number(event.start_price).toFixed(2)}
            </Text>
            <Text style={eventStyles.cardText}>
              {<Fontisto name="date" size={16} color="black" accessibilityLabel="calendar icon"/>}{' '}
              {convertTime(event.start_time)}
            </Text>
          </View>
        </View>
      </View>
    )
  }