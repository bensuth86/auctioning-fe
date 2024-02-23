import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { styles } from '../style-sheet'
import { Snackbar } from 'react-native-paper'
import { postBusiness } from '../utils'
import { SelectList } from 'react-native-dropdown-select-list'

function BusinessSignUp({ navigation }) {
  const [businessName, setBusinessName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [selected, setSelected] = useState("");

  useEffect(() => {
    validateForm()
  }, [businessName,, postcode])

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
        postBusiness({ businessName: businessName, postcode: postcode })
        .then(() => {
          navigation.navigate('CustomerHomepage')
          console.log('Form submitted successfully!')
          setSnackbarMessage('Business account created successfully!')
          setVisible(true)
        })
        .catch((error) => {
          console.error('Error submitting form:', error)
          setSnackbarMessage('Failed to created an account. Please try again.')
          setVisible(true)
        })
    } else {
      console.log('Form has errors. Please correct them.')
    }
  }

  const data = [
    {key:'1', value:'A'},
    {key:'2', value:'B'},
    {key:'3', value:'C'},
    {key:'4', value:'D'},
    {key:'5', value:'E'},
    {key:'6', value:'F'},
    {key:'7', value:'G'},
]
const data2 = [
    {key:'1', value:'1'},
    {key:'2', value:'2'},
    {key:'3', value:'3'},
    {key:'4', value:'4'},
    {key:'5', value:'5'},
    {key:'6', value:'6'},
    {key:'7', value:'7'},
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
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        style={styles.dropdown}
        search={false}
        placeholder="Rows"
    />
    <SelectList 
        setSelected={(val) => setSelected(val)} 
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
