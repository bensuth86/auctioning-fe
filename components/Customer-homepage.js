import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {Button} from "../helpers";
import { styles } from "../style-sheet";

function CustomerHomepage({ navigation }) {
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
