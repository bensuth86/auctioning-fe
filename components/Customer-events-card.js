/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "../style-sheet";
import { eventStyles } from "../style-sheet-events";

function EventsCard({ event }) {
    return (
        <View style= {eventStyles.eventcard}>
            <Text>{event.film_title}</Text>
            <Image style={{ width: 112.5, height: 166.5}} 
                source={{uri: event.poster}}
            />
            <Text>{event.business_name}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text>Certificate: {event.certificate}</Text>
                <Text style={{marginLeft: 50}} >runtime: {event.run_time}</Text>
            </View>
        </View>

    )
}

export default EventsCard