import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../helpers";
import { styles } from "../style-sheet";
import { getEventsByUserId } from "../utils"

function CustomerHomepage({ navigation }) {

    const [eventsList, setEventsList] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getEventsByUserId().then((response) => {
            setEventsList(response)
            setIsLoading(false)
        })
    }, [])

    return (
        <View style={styles.container}>

            <Button
            btnText="View Seating" 
            onPress={() => 
                navigation.navigate('SeatingPage')}
            />
        </View>
    )
}

export default CustomerHomepage;
