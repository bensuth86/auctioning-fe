import React from "react";
import { View } from "react-native";
import Button from "../helpers";
import { styles } from "../style-sheet"

function WelcomePage({ navigation }) {

    return (
        <View style={styles.container}>
            <Button
            btnText="Customer account" 
            onPress={() => 
                navigation.navigate('Login', {usertype: 'Customer'})}
            />
            <Button
            btnText="Business account" 
            onPress={() => {navigation.navigate('Login', {usertype: 'Business'})}} 
            />

        </View>      
      )
}

export default WelcomePage