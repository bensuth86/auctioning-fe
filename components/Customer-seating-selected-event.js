import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { styles } from '../style-sheet'
import { getEventByEventId } from '../utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { selectedMovieStyle } from '../style-sheet-selected-movie'
import { getBusinessById } from '../utils'
import { convertTime } from '../helpers'

function SelectedEvent({ event_id }) {
  const [selectedEvent, setSelectedEvent] = useState({})
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEventByEventId(event_id).then((response) => {
      setSelectedEvent(response)
      getBusinessById(response.business_id).then((response) => {
        setSelectedBusiness(response)
        setIsLoading(false)
      })
    })
  }, [event_id])

  if (isLoading)
    return (
      <>
        <Text>Event loading...</Text>
        <ActivityIndicator />
      </>
    )
  return (
    <View style={{ width: '100%' }}>
      <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 10 }}>
        {selectedEvent.film_title}
      </Text>
      <View style={selectedMovieStyle.eventContainer}>
        <View style={selectedMovieStyle.imageContainer}>
          <Image
            source={{ uri: selectedEvent.poster }}
            style={{ width: 112.5, height: 166.5 }}
          />
        </View>
        <View style={selectedMovieStyle.eventInfo}>
          <Text style={selectedMovieStyle.text}>
            {selectedBusiness.business_name},
          </Text>
          <Text style={selectedMovieStyle.text}>
            {selectedBusiness.postcode}
          </Text>
          <Text style={selectedMovieStyle.text}>
            Rating: {selectedEvent.certificate}
          </Text>
          <Text style={selectedMovieStyle.text}>
            Run time: {selectedEvent.run_time} minutes
          </Text>
          <Text>Start time: {convertTime(selectedEvent.start_time)}</Text>
        </View>
      </View>
    </View>
  )
}

export default SelectedEvent
