import React, { useState, useEffect, useContext } from 'react'
import { View, TextInput, Text } from 'react-native'
import { styles } from '../style-sheet'
import { postUser } from '../utils'
import { Snackbar } from 'react-native-paper'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { Button } from '../helpers'
import { ActivityIndicator } from 'react-native-paper'

function CustomerSignUp({ navigation }) {
  const [username, setUserName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { setCurrentCustomer } = useContext(CustomerContext)
  const [loading, isLoading] = useState(false)

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
      isLoading(true)
      const formattedPostcode = postcode.replace(/\s/g, '').toUpperCase()
      postUser({ username: username, postcode: formattedPostcode })
        .then(({ user }) => {
          setCurrentCustomer(user)
          isLoading(false)
          navigation.navigate('CustomerHomepage')
          setUserName('')
          setPostcode('')
        })
        .catch((error) => {
          setUserName('')
          setPostcode('')
          isLoading(false)
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
      {loading ? (
        <View>
          <ActivityIndicator color="red" size={'large'} />
        </View>
      ) : (
        <Button
          btnText="SUBMIT"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
      )}
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
