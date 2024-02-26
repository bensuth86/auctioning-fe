/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../style-sheet'
import { eventStyles } from '../style-sheet-events'
import { convertTime } from '../helpers'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { homeStyles } from '../style-sheet-customer-home'

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
        />
        <View style={eventStyles.rightSide}>
          <Text>
            {event.business_name}, {event.postcode}
          </Text>
          <Text style={eventStyles.cardText}>
            {<FontAwesome5 name="map-marker-alt" size={16} color="black" />}{' '}
            {event.distance_in_miles.toFixed(2)} miles
          </Text>
          <Text style={eventStyles.cardText}>
            <AntDesign name="clockcircleo" size={16} color="black" />{' '}
            {event.run_time} minutes
          </Text>
          <Text style={eventStyles.cardText}>
            {<FontAwesome5 name="money-bill-wave" size={16} color="black" />}{' '}
            Starting from £{Number(event.start_price).toFixed(2)}
          </Text>
          <Text style={eventStyles.cardText}>
            {<Fontisto name="date" size={16} color="black" />}{' '}
            {convertTime(event.start_time)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export function UnavailableEventsCard({ event }) {
  return (
    <View style={eventStyles.unavailableeventcard}>
      <Text style={eventStyles.cardHeader}>SOLD OUT</Text>
      <View style={eventStyles.mainContent}>
        <Image
          style={{ width: 130, height: 180.5, opacity: 0.3 }}
          source={{ uri: event.poster }}
        />

        <View style={eventStyles.rightSide}>
          <Text style={eventStyles.unavailcardText}>
            {event.business_name}, {event.postcode}
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<FontAwesome5 name="map-marker-alt" size={16} color="grey" />}{' '}
            {event.distance_in_miles.toFixed(2)} miles
          </Text>
          <Text style={eventStyles.unavailcardText}>
            <AntDesign name="clockcircleo" size={16} color="grey" />{' '}
            {event.run_time} minutes
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<FontAwesome5 name="money-bill-wave" size={16} color="grey" />}{' '}
            Starting from £{Number(event.start_price).toFixed(2)}
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<Fontisto name="date" size={16} color="grey" />}{' '}
            {convertTime(event.start_time)}
          </Text>
        </View>
      </View>
    </View>
  )
}
