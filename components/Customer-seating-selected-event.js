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
import { useFonts } from 'expo-font'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

function SelectedEvent({ event_id }) {
  const [selectedEvent, setSelectedEvent] = useState({})
  const [selectedBusiness, setSelectedBusiness] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })

  useEffect(() => {
    getEventByEventId(event_id).then((response) => {
      setSelectedEvent(response)
      getBusinessById(response.business_id).then((response) => {
        setSelectedBusiness(response)
        setIsLoading(false)
      })
    }).catch((err) => {
      setIsLoading(false)
      console.log(err.response.data.msg)
      if (err.response.data.msg === 'ID not found') {
        setErrorMessage('Sorry - the event ID does not exist.\nCannot fetch event information.')
      }
      
      if (err.response.data.msg === 'Bad request') {
        setErrorMessage('Sorry - the event ID is invalid.\nCannot fetch event information.')
      }

    })
  }, [event_id])

  if (isLoading)
    return (
      <>
      <View>
      <ActivityIndicator size="large" color="red" />
      </View>
      </>
    )

    if (errorMessage !== '') {
      return (
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      )
    }
  return (
    <View style={{ width: '80%' }}>
      <View style={selectedMovieStyle.eventContainer}>
        <View style={selectedMovieStyle.imageContainer}>
          <Image
            source={{ uri: selectedEvent.poster }}
            style={{ width: 112.5, height: 166.5 }}
          />
        </View>
        <View style={selectedMovieStyle.eventInfo}>
          <Text style={selectedMovieStyle.eventHeader}>
            {selectedEvent.film_title}, {selectedEvent.certificate}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="map-marker-alt" size={12} color="#f5f5f5" />
            <Text style={[selectedMovieStyle.text, { marginLeft: 5 }]}>
              {selectedBusiness.business_name}, {selectedBusiness.postcode}{' '}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="clockcircleo" size={12} color="#f5f5f5" />
            <Text style={[selectedMovieStyle.text, { marginLeft: 5 }]}>
              {selectedEvent.run_time} minutes
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Fontisto name="date" size={12} color="#f5f5f5" />
            <Text style={[selectedMovieStyle.text, { marginLeft: 5 }]}>
              {convertTime(selectedEvent.start_time)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default SelectedEvent
