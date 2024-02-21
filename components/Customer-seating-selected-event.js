import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../style-sheet'
import { getEventByEventId } from '../utils'
import { useState } from 'react'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { selectedMovieStyle } from '../style-sheet-selected-movie'
import { getBusinessById } from '../utils'

function SelectedEvent() {
  const [selectedEvent, setSelectedEvent] = useState({})
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const ID = 3

  useEffect(() => {
    getEventByEventId(ID).then((response) => {
        setSelectedEvent(response)
        getBusinessById(response.business_id).then((response) => {
            setSelectedBusiness(response)
            setIsLoading(false)
        })
    })
  }, [ID])

  if (isLoading) return <Text>Loading...</Text>
  return (
    <View>
      <Text style={{ textAlign: 'center' }}>Selected event:</Text>
      <View style={selectedMovieStyle.eventContainer}>
        <Image
          source={{ uri: selectedEvent.poster }}
          style={{ width: 150, height: 222 }}
        />
        <View style={selectedMovieStyle.eventInfo}>
          <Text>{selectedEvent.film_title}</Text>
          <Text>Rating: {selectedEvent.certificate}</Text>
          <Text>Run time: {selectedEvent.run_time} minutes</Text>
          <Text>Start time: {selectedEvent.start_time}</Text>
          <Text>Business: {selectedBusiness.business_name}</Text>
          <Text>POSTCODE: {selectedBusiness.postcode}</Text>
        </View>
      </View>
    </View>
  )
}

export default SelectedEvent
