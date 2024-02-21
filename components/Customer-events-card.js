/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from 'react'
import { styles } from "../style-sheet";

function EventsCard({ event }) {
    console.log(event.poster)
    return (
        <View style={styles.eventcard}>
            <Text>{event.film_title}</Text>
            <Image style={styles.logo} 
                source={{uri: event.poster}}
            />
            <Text>{event.business_name}</Text>
            <Text>{event.certificate}</Text>
            <Text style={{textAlign: 'right'}}>{event.run_time}</Text>
        </View>
    )
}

export default EventsCard