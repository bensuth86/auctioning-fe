import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './style-sheet'

// TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

export function Button({ btnText, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttontext}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  )
}

export function seatButton({ btnText, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttontext}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  )
}
