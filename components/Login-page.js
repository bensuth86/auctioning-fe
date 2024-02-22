/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { Text, TextInput, View, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { Button } from '../helpers'
import { getAllUsers } from '../utils'
import { useEffect } from 'react'
import { useContext } from "react";
import CustomerContext from '../Contexts/LoggedInCustomerContext'

function Login({ navigation, route }) {
  const usertype = route.params.usertype
  const [loginName, setLoginName] = useState('')
  const [submitCustomerClicked, setCustomerSubmitClicked] = useState(false)
  // const [match, setMatch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { setCurrentCustomer } = useContext(CustomerContext);

  useEffect(() => {
    if (submitCustomerClicked) {
      getAllUsers()
        .then((response) => {
          let foundMatch = false;
          response.data.users.forEach((user) => {
            if (loginName === user.username) {
              setCurrentCustomer({ username: user.username, user_id: user.user_id, postcode: user.postcode });
              navigation.navigate('CustomerHomepage');
              // setMatch(true);
              foundMatch = true;
              setLoginName('');
              setErrorMessage('');
            }
          });
          if (!foundMatch) {
            setErrorMessage('That is not a valid username. Please try again');
          }
          setCustomerSubmitClicked(false);
        })
        .catch((error) => {
          // to add errors later
        });
    }
  }, [submitCustomerClicked]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
    <Text style={{ color: 'green' }}>LOGINS: (some may be out of radius if no results show up):</Text>
      <Text style={{ color: 'green' }}>BLOST (Birmingham logins): 'mrgrumpy19', 'smink123', 'tiahontoast', 'johnsmith'</Text>
      <Text style={{ color: 'green' }}>BLOST (Manchester logins): 'pelicanlogsong', 'oldeuboi', 'nixrolls'</Text>
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
            if (loginName === '') {
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
    </ScrollView>
  )
}

export default Login
