import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { styles } from '../style-sheet'
import { Snackbar } from 'react-native-paper'
import { postBusiness } from '../utils'
import { SelectList } from 'react-native-dropdown-select-list'
import { generateSeatGrid } from '../helpers'

function BusinessSignUp({ navigation }) {
  const [businessName, setBusinessName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [selectedRow, setSelectedRow] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    validateForm()
  }, [businessName, , postcode])
  const validateForm = () => {
    let errors = {}

    if (!businessName) {
      errors.name = 'Business name is required'
    }
    if (!postcode) {
      errors.postcode = 'Postcode is required'
    } else if (postcode.length < 5) {
      errors.postcode = 'Postcode must be at least 5 characters'
    }
    setErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }

  const handleSubmit = () => {
    if (isFormValid) {
      const seatGrid = generateSeatGrid(
        parseInt(selectedRow),
        parseInt(selectedColumn)
      )
      postBusiness({ business_name: businessName }, postcode, seatGrid)
        .then(() => {
          // navigation.navigate('Login')
          console.log('Form submitted successfully!')
          setSnackbarMessage(
            'Business account created successfully! Please go to login...'
          )
          setVisible(true)
          setPostcode('')
          setBusinessName('')
          setSelectedRow('')
          setSelectedColumn('')
          setSuccess(true)
        })
        .catch((error) => {
          console.error('Error submitting form:', error)
          setSnackbarMessage('Failed to submit form. Please try again.')
          setVisible(true)
        })
    } else {
      console.log('Form has errors. Please correct them.')
    }
  }

  const data = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
  ]
  const data2 = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
  ]

  return (
    <View style={styles.container}>
      <Text>Become Auctioning-fe seller</Text>

      <TextInput
        style={styles.textbox}
        placeholder="Business Name"
        value={businessName}
        onChangeText={(businessName) => setBusinessName(businessName)}
      />
      <TextInput
        style={styles.textbox}
        placeholder="Postcode"
        value={postcode}
        onChangeText={(postcode) => setPostcode(postcode)}
      />
      <Text>Select Seating Layout</Text>
      <View style={styles.dropdownContainer}>
        <SelectList
          setSelected={(val) => setSelectedRow(val)}
          data={data}
          save="value"
          style={styles.dropdown}
          search={false}
          placeholder="Rows"
        />
        <SelectList
          setSelected={(val) => setSelectedColumn(val)}
          data={data2}
          save="value"
          style={styles.dropdown}
          search={false}
          placeholder="Columns"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          {error}
        </Text>
      ))}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  )
}

export default BusinessSignUp
