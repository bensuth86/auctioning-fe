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
import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

export function EventsCard({ event }) {
  return (
    <View style={eventStyles.eventcard}>
      <Text style={eventStyles.cardHeader}>
        {event.film_title},{' '}
        <Text style={{ fontFamily: 'Comfortaa-Light' }}>
          {event.certificate}
        </Text>
      </Text>
      <View style={eventStyles.mainContent}>
        <Image
          style={{ width: 160, height: 230.5 }}
          source={{ uri: event.poster }}
          accessibilityLabel={`${event.film_title} poster`}
        />
        <View style={eventStyles.rightSide}>
          <Text style={eventStyles.cardText}>
            {event.business_name},{'\n'}
            {event.postcode}
          </Text>
          <Text style={eventStyles.cardText}>
            {<FontAwesome5 name="map-marker-alt" size={12} color="black" accessibilityLabel="map marker icon"/>}{' '}
            {event.distance_in_miles.toFixed(2)} miles
          </Text>
          <Text style={eventStyles.cardText}>
            <AntDesign name="clockcircleo" size={12} color="black" accessibilityLabel="clock icon"/>{' '}
            {event.run_time} minutes
          </Text>
          <Text style={eventStyles.cardText}>
            {<FontAwesome5 name="money-bill-alt" size={12} color="black" accessibilityLabel="cash note icon"/>}{' '}
            Pricing from{'\n'}£{Number(event.start_price).toFixed(2)}
          </Text>
          <Text style={eventStyles.cardText}>
            <MaterialIcons name="event-seat" size={12} color="black" accessibilityLabel="cinema chair icon"/> Seats
            left: {event.available_seats.length}
          </Text>
          <Text style={eventStyles.cardText}>
            {<Fontisto name="date" size={12} color="black" accessibilityLabel="calendar icon"/>}{' '}
            {convertTime(event.start_time)}
          </Text>
        </View>
      </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Feather name="mouse-pointer" size={25} color="#7bc47f" accessibilityLabel="click icon"/>
          </View>
    </View>
  )
}

export function UnavailableEventsCard({ event }) {
  return (
    <View style={eventStyles.eventcard}>
      <Text style={eventStyles.cardHeader}>
        {event.film_title},{' '}
        <Text style={{ fontFamily: 'Comfortaa-Light' }}>
          {event.certificate}
        </Text>
      </Text>
      <View style={eventStyles.mainContent}>
        <Image
          style={{ width: 160, height: 230.5, opacity: 0.3 }}
          source={{ uri: event.poster }}
          accessibilityLabel={`${event.film_title} poster`}
        />

        <View style={eventStyles.rightSide}>
          <Text style={eventStyles.unavailcardText}>
            {event.business_name},{'\n'}
            {event.postcode}
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<FontAwesome5 name="map-marker-alt" size={12} color="grey" accessibilityLabel="map marker icon"/>}{' '}
            {event.distance_in_miles.toFixed(2)} miles
          </Text>
          <Text style={eventStyles.unavailcardText}>
            <AntDesign name="clockcircleo" size={12} color="grey" accessibilityLabel="clock icon"/>{' '}
            {event.run_time} minutes
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<FontAwesome5 name="money-bill-alt" size={12} color="grey" accessibilityLabel="cash note icon"/>}{' '}
            Pricing from{'\n'}
            {Number(event.start_price).toFixed(2)}
          </Text>
          <Text style={eventStyles.unavailcardText}>
            {<Fontisto name="date" size={12} color="grey" accessibilityLabel="calendar icon"/>}{' '}
            {convertTime(event.start_time)}
          </Text>
        </View>
      </View>
      <Text style={{ fontFamily: 'Comfortaa-Bold', color: 'red' }}>
        SOLD OUT
      </Text>
    </View>
  )
}