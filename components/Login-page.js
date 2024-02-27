/* eslint-disable react/react-in-jsx-scope */
import { useState, useRef } from 'react'
import { Text, TextInput, View, ScrollView, Platform } from 'react-native'
import { styles } from '../style-sheet'
import { Button } from '../helpers'
import { getAllUsers, getAllBusinesses } from '../utils'
import { useEffect } from 'react'
import { useContext } from 'react'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useFonts } from 'expo-font'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';


function Login({ navigation, route }) {
  const usertype = route.params.usertype
  const [loginName, setLoginName] = useState('')
  const [submitCustomerClicked, setCustomerSubmitClicked] = useState(false)
  const [submitBusinessClicked, setBusinessClicked] = useState(false)
  // const [match, setMatch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // const [expoPushToken, setExpoPushToken] = useState(null);
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })
  const { setCurrentCustomer } = useContext(CustomerContext)

//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: false,
//       shouldSetBadge: false,
//     }),
//   });

//   async function sendPushNotification(expoPushToken) {
//     const message = {
//       to: expoPushToken,
//       title: 'Welcome Back!',
//       body: 'You have successfully logged in.',
//     };
  
//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   }


// // CODE FROM EXPO DOCS
// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token.data;
// }


//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => {console.log(token), setExpoPushToken(token)});

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

  useEffect(() => {
    if (submitCustomerClicked) {
      getAllUsers()
        .then((response) => {
          let foundMatch = false
          response.data.users.forEach((user) => {
            if (loginName === user.username) {
              sendPushNotification(expoPushToken)
              setCurrentCustomer({
                username: user.username,
                user_id: user.user_id,
                postcode: user.postcode,
              })
              navigation.navigate('CustomerHomepage')
              // setMatch(true);
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
      getAllBusinesses()
        .then((response) => {
          let foundMatch = false
          response.data.businesses.forEach((business) => {
            if (loginName === business.business_name) {
              // sendPushNotification(expoPushToken)
              // setCurrentCustomer({ business: business.business_name });
              navigation.navigate('BusinessHomepage', {
                business_id: business.business_id,
              })
              // setMatch(true);
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

  const showAlert = (content) =>
    Alert.alert(
      'Pre-existing logins',
      content
      // [
      //   {
      //     text: 'Cancel',
      //     onPress: () => Alert.alert('Cancel Pressed'),
      //     style: 'cancel',
      //   },
      // ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       'This alert was dismissed by tapping outside of the alert dialog.',
      //     ),
      // },
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        {/* <Text style={{ color: 'green' }}>LOGINS: (some may be out of radius if no results show up):</Text>
      <Text style={{ color: 'green' }}>BLOST (Birmingham logins): 'mrgrumpy19', 'smink123', 'tiahontoast', 'johnsmith'</Text>
      <Text style={{ color: 'green' }}>BLOST (Manchester logins): 'pelicanlogsong', 'oldeuboi', 'nixrolls'</Text>
      <Text style={{ color: 'green' }}>BLOST (Business logins): 'Cultplex', 'Odeon Great Northern', 'VUE Star City'</Text> */}
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            color: '#f5f5f5',
            fontSize: 12,
            textAlign: 'center'
          }}
        >
          Already have an account? {`\n`} Enter {usertype.toLowerCase()} username:
        </Text>
        <TextInput
          style={styles.textboxLight}
          placeholder="..."
          onChangeText={(textEntry) => setLoginName(textEntry)}
          value={loginName}
        />
        {errorMessage !== '' && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}
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
          <TouchableOpacity onPress={() =>
            showAlert('mrgrumpy19\nsmink123\nnixrolls\ntiahontoast\npelicanlogsong')
          }>
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            color: '#f5f5f5',
            fontSize: 12,
          }}
        >
          PRE-EXISTING LOGINS
        </Text>
      </TouchableOpacity>
        )}
        {usertype === 'Business' && (
        <TouchableOpacity onPress={() =>
              showAlert('VUE Star City\nCultplex\nOdeon Great Northern')
            }>
          <Text
            style={{
              fontFamily: 'Comfortaa-Regular',
              color: '#f5f5f5',
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