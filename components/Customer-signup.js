import React, { useState, useEffect, useContext } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { styles } from '../style-sheet'
import { postUser } from '../utils'
import { Snackbar } from 'react-native-paper'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useFonts } from 'expo-font'
import { Button } from '../helpers'

function CustomerSignUp({ navigation }) {
  const [username, setUserName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { setCurrentCustomer } = useContext(CustomerContext)
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })


  useEffect(() => {
    setErrors({})
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
    } else if (
      !postcode.match(/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/gim)
    ) {
      errors.postcode = 'Postcode invalid'
    }
    setErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0)
  }

  const handleSubmit = () => {
    if (isFormValid) {
      const formattedPostcode = postcode.replace(/\s/g, '').toUpperCase()
      postUser({ username: username, postcode: formattedPostcode })
        .then(({ user }) => {
          setCurrentCustomer(user)
          navigation.navigate('CustomerHomepage')
          setSnackbarMessage('Form submitted successfully!')
          setVisible(true)
        })
        .catch((error) => {
          console.error('Error submitting form:', error)
          setSnackbarMessage('Failed to submit form. Please try again.')
          setVisible(true)
        })
    } else {
      setSnackbarMessage('Form has errors. Please correct them.')
    }
  }

  return (
    <View style={styles.darkContainer}>
      <Text
        style={{
          color: '#f5f5f5',
          fontFamily: 'Comfortaa-Regular',
          paddingRight: 20,
          paddingLeft: 20,
          textAlign: 'center',
        }}
      >
        Sign up to see all auctions near you!
      </Text>
      <TextInput
        style={styles.textboxLight}
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUserName(username)}
      />
      <TextInput
        style={styles.textboxLight}
        placeholder="Postcode"
        value={postcode}
        onChangeText={(postcode) => setPostcode(postcode)}
      />
      {/* <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity> */}
      <Button btnText="SUBMIT" onPress={handleSubmit} disabled={!isFormValid} />
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
