import React, { useState, useEffect, useContext } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { styles } from '../style-sheet'
import { postUser } from '../utils'
import { Snackbar } from 'react-native-paper'
import CustomerContext from '../Contexts/LoggedInCustomerContext'

function CustomerSignUp({ navigation }) {
  const [username, setUserName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { setCurrentCustomer } = useContext(CustomerContext)

  useEffect(() => {
    validateForm()
  }, [username, postcode])

  const validateForm = () => {
    let errors = {}

    if (!username) {
      errors.name = 'Username is required'
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
      postUser({ username: username, postcode: postcode })
        .then(({ user }) => {
          setCurrentCustomer(user)
          navigation.navigate('CustomerHomepage')
          console.log('Form submitted successfully!')
          setSnackbarMessage('Form submitted successfully!')
          setVisible(true)
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

  return (
    <View style={styles.container}>
      <Text>Sign up to see all Auctions</Text>
      <TextInput
        style={styles.textbox}
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUserName(username)}
      />
      <TextInput
        style={styles.textbox}
        placeholder="Postcode"
        value={postcode}
        onChangeText={(postcode) => setPostcode(postcode)}
      />
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

export default CustomerSignUp
