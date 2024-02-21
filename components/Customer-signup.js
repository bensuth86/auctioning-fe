import { useState, useEffect } from 'react'
import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { styles } from '../style-sheet'

function CustomerSignUp({ navigation }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false); 


  useEffect(() => {
    validateForm()
  }, [userName, password])

  const validateForm = () => {
    let errors = {}

    if (!userName) {
      errors.name = 'Username is required.'
    }
    if (!password) {
      errors.password = 'Password is required.'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }
    setErrors(errors)
    setIsFormValid(Object.keys(errors).length === 0); 
  }

  const handleSubmit = () => { 
    if (isFormValid) { 
        navigation.navigate('CustomerHomepage')
        console.log('Form submitted successfully!'); 
    } else { 
        console.log('Form has errors. Please correct them.'); 
    } 
}; 

  return (
    <View style={styles.container}>
        <Text>Sign up to see all Auctions</Text>
      <TextInput
        style={styles.textbox}
        placeholder="Username"
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
      />
      <TextInput
        style={styles.textbox}
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
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
    </View>
  )
}

export default CustomerSignUp