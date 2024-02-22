import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "../helpers";
import { styles } from "../style-sheet";
import { getEventsByUserId } from "../utils"
import EventsCard from "./Customer-events-card";

function CustomerHomepage({ navigation }) {

    const [eventsList, setEventsList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const id = 1

    useEffect(() => {
        getEventsByUserId(id).then((response) => {
            console.log(response)
            setEventsList(response)
            setIsLoading(false)
        })
    }, [id])
    
    // if (isLoading) return <Text>Loading...</Text>
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>       
            <View style={styles.container}>
                { eventsList.map((event) => {
                    return (
                        <EventsCard key={event.event_id} event={event} />
                        // <View key={event.event_id}>
                        //     <Text>{event.film_title}</Text>
                        // </View>                       
                    )

                }) 
                }
                <Button
                btnText="View Seating" 
                onPress={() => 
                    navigation.navigate('SeatingPage')}
                />
            </View>
        </ScrollView> 
    )
}

export default CustomerHomepage;
