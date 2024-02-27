import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './style-sheet'
import { seatStyles } from './style-sheet-seats'

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

export function SeatButton({ btnText, onPress, seatStyle }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={seatStyle}>
        <Text style={seatStyles.buttontext}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  )
}

export function DisabledSeatButton({ btnText, seatStyle }) {
  return (
    <View style={seatStyle}>
      <Text style={styles.buttontext}>{btnText}</Text>
    </View>
  )
}

export function DisabledButton({ btnText }) {
  return (
    <View style={styles.disabledButton}>
      <Text style={styles.buttontext}>{btnText}</Text>
    </View>
  )
}

export function generateSeatGrid(rows, columns) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let seatGrid = []

  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < columns; j++) {
      let seat = alphabet[i] + (j + 1)
      row.push(seat)
    }
    seatGrid.push(row)
  }

  return seatGrid
}

export function convertTime(timeString) {
  const dateConversion = new Date(timeString)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    hour12: true,
  }

  const formattedDate = dateConversion
    .toLocaleString('en-GB', dateConversion)
    .slice(0, -3)
  return formattedDate
}
