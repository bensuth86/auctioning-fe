import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, TextInput, Text, TouchableOpacity, Platform } from 'react-native'
import { styles } from '../style-sheet'
import { postUser } from '../utils'
import { Snackbar } from 'react-native-paper'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useFonts } from 'expo-font'
import { Button } from '../helpers'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

function CustomerSignUp({ navigation }) {
  const [username, setUserName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const { setCurrentCustomer } = useContext(CustomerContext)
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      title: 'Account Created!',
      body: 'You have successfully signed in.',
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  
// CODE FROM EXPO DOCS
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

useEffect(() => {
  registerForPushNotificationsAsync().then(token => {console.log(token), setExpoPushToken(token)});

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

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
      sendPushNotification(expoPushToken)
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
