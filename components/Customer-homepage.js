/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { eventStyles } from '../style-sheet-events'
import { getEventsByUserId } from '../utils'

import EventsCard from './Customer-events-card'
import CustomerSeating from './Customer-seating-selection'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'

function CustomerHomepage({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)

  const [eventsList, setEventsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEventsByUserId(currentCustomer.user_id).then((response) => {
      setEventsList(response)
      setIsLoading(false)
    })
  }, [currentCustomer.user_id])

  function logUserOut() {
    navigation.navigate('Welcome_page')
    setCurrentCustomer({ username: null, user_id: null })
  }

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View>
          <Text>Hello {currentCustomer.username}</Text>
          <Button btnText={'Log out'} onPress={() => logUserOut()} />
        </View>
        <View style={eventStyles.eventslist}>
          {eventsList.map((event) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SeatingPage', {
                    event_id: event.event_id,
                    business_id: event.business_id,
                  })
                }
              >
                <EventsCard key={event.event_id} event={event} />
              </TouchableOpacity>
            )
          })}
          <Button
            btnText="View Seating"
            onPress={() => navigation.navigate('SeatingPage')}
          />
        </View>
      </View>
    </ScrollView>
  )
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View style={styles.container}>
            <View>
                <Text>Hello {currentCustomer.username}</Text>       
                <Button btnText={"Log out"} onPress={() => logUserOut()}/>
            </View>       
            <View style={eventStyles.eventslist}>
                { eventsList.map((event) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("SeatingPage", { id: event.event_id, business_id: event.business_id})}>
                            <EventsCard key={event.event_id} event={event} /> 
                        </TouchableOpacity>                 
                    )
                }) 
                }
            </View>
        </View>
        </ScrollView> 
    )

}

export default CustomerHomepage
