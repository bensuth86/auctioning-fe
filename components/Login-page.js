import { useState } from 'react'
import { Text, TextInput, View, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { Button } from '../helpers'
import { getAllUsers, getAllBusinesses } from '../utils'
import { useEffect } from 'react'
import { useContext } from 'react'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

function Login({ navigation, route }) {
  const usertype = route.params.usertype
  const [loading, setLoading] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [submitCustomerClicked, setCustomerSubmitClicked] = useState(false)
  const [submitBusinessClicked, setBusinessClicked] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { setCurrentCustomer } = useContext(CustomerContext)

  useEffect(() => {
    if (submitCustomerClicked) {
      setLoading(true)
      getAllUsers().then((response) => {
        let foundMatch = false
        setLoading(false)
        response.data.users.forEach((user) => {
          if (loginName === user.username) {
            setCurrentCustomer({
              username: user.username,
              user_id: user.user_id,
              postcode: user.postcode,
            })
            navigation.navigate('CustomerHomepage')
            foundMatch = true
            setLoginName('')
            setErrorMessage('')
          }
        })
        if (!foundMatch) {
          setErrorMessage('That is not a valid username. Please try again')
        }
        setCustomerSubmitClicked(false)
      })
    }

    if (submitBusinessClicked) {
      setLoading(true)
      getAllBusinesses().then((response) => {
        let foundMatch = false
        setLoading(false)
        response.data.businesses.forEach((business) => {
          if (loginName === business.business_name) {
            navigation.navigate('BusinessHomepage', {
              business_id: business.business_id,
              success: null,
            })
            foundMatch = true
            setLoginName('')
            setErrorMessage('')
          }
        })
        if (!foundMatch) {
          setErrorMessage('That is not a valid username. Please try again')
        }
        setBusinessClicked(false)
      })
    }
  }, [submitCustomerClicked, submitBusinessClicked])

  const showAlert = (content) => Alert.alert('Pre-existing logins', content)

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            color: '#f5f5f5',
            fontSize: 12,
            textAlign: 'center',
            lineHeight: 19,
          }}
        >
          Already have an account? {`\n`} Enter your {usertype.toLowerCase()}{' '}
          username:
        </Text>
        <TextInput
          style={styles.textboxLight}
          placeholder="Username"
          onChangeText={(textEntry) => setLoginName(textEntry)}
          value={loginName}
        />
        {errorMessage !== '' && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}
        {!loading ? (
          <Button
            btnText="SUBMIT"
            onPress={() => {
              if (usertype === 'Customer') {
                if (loginName === '') {
                  setLoginName('')
                  setErrorMessage('Required: Please enter a username')
                } else {
                  setCustomerSubmitClicked(true)
                }
              } else if (usertype === 'Business') {
                if (loginName === '') {
                  setLoginName('')
                  setErrorMessage('Required: Please enter a business name')
                } else {
                  setBusinessClicked(true)
                }
              }
            }}
          />
        ) : (
          <View>
            <ActivityIndicator color="red" size={'large'} />
          </View>
        )}
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            color: '#f5f5f5',
            fontSize: 12,
          }}
        >
          Or, create an account here:{' '}
        </Text>
        {usertype === 'Customer' && (
          <Button
            btnText="SIGN UP"
            onPress={() => navigation.navigate('CustomerSignUpPage')}
          />
        )}
        {usertype === 'Business' && (
          <Button
            btnText="SIGN UP"
            onPress={() => navigation.navigate('BusinessSignupPage')}
          />
        )}
        {usertype === 'Customer' && (
          <TouchableOpacity
            onPress={() =>
              showAlert(
                'mrgrumpy19\nsmink123\nnixrolls\ntiahontoast\npelicanlogsong'
              )
            }
          >
            <Text
              style={{
                fontFamily: 'Comfortaa-Regular',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: 12,
              }}
            >
              PRE-EXISTING LOGINS
            </Text>
          </TouchableOpacity>
        )}
        {usertype === 'Business' && (
          <TouchableOpacity
            onPress={() =>
              showAlert('VUE Star City\nCultplex\nOdeon Great Northern')
            }
          >
            <Text
              style={{
                fontFamily: 'Comfortaa-Regular',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: 12,
              }}
            >
              PRE-EXISTING LOGINS
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default Login
