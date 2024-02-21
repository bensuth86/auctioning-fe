import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'

function CustomerSeating({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        btnText="View Auction"
        onPress={() => navigation.navigate('AuctionPage')}
      />
    </View>
  )
}

export default CustomerSeating
