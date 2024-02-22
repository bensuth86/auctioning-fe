/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from '../style-sheet'
import { Button } from '../helpers'
import { getAllUsers } from '../utils'
import { useEffect } from 'react'

function Login({ navigation, route }) {
  const usertype = route.params.usertype
  const [loginName, setLoginName] = useState([])
  const [submitCustomerClicked, setCustomerSubmitClicked] = useState(false)
  const [match, setMatch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (submitCustomerClicked) {
      getAllUsers().then((response) => {
        let foundMatch = false
        response.data.users.forEach((user) => {
          if (loginName === user.username) {
            navigation.navigate('CustomerHomepage')
            setMatch(true)
            foundMatch = true
            setLoginName('')
            setErrorMessage('')
          }
        })
        if (!foundMatch) {
          setLoginName('')
          setErrorMessage('That is not a valid username. Please try again')
        }
        setCustomerSubmitClicked(false)
      })
    }
  }, [submitCustomerClicked, loginName, match])

  return (
    <View style={styles.container}>
      <Text style={{ color: 'green' }}>BLOST (logins): use 'TestUser', 'smink123', 'tiahontoast'</Text>
      <Text>Enter {usertype} username:</Text>
      <TextInput
        style={styles.textbox}
        placeholder="..."
        onChangeText={(textEntry) => setLoginName(textEntry)}
        value={loginName}
      />
      {errorMessage !== '' && (
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      )}
      <Button
        btnText="Submit"
        onPress={() => {
          if (usertype === 'Customer') {
            if (Array.isArray(loginName)) {
              setLoginName('')
              setErrorMessage('Required: Please enter a username')
            } else {
              setCustomerSubmitClicked(true)
            }
          } else if (usertype === 'Business') {
            //GET /api/businesses
            navigation.navigate('BusinessHomepage')
          }
        }}
      />

      {usertype === 'Customer' && (
        <Button
          btnText="Sign up"
          onPress={() => navigation.navigate('CustomerSignUpPage')}
        />
      )}
    </View>
  )
}

export default Login
