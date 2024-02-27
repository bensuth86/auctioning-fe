import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Text, TouchableOpacity, Platform } from 'react-native'
import { styles } from '../style-sheet'
import { Snackbar } from 'react-native-paper'
import { postBusiness } from '../utils'
import { SelectList } from 'react-native-dropdown-select-list'
import { generateSeatGrid } from '../helpers'
import { Button } from '../helpers'
import { ScrollView } from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

function BusinessSignUp({ navigation }) {
  const [businessName, setBusinessName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [selectedRow, setSelectedRow] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('')
  const [success, setSuccess] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
      title: 'Business Account Created!',
      body: 'You have access to all Business ',
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
  }, [businessName, , postcode])
  const validateForm = () => {
    let errors = {}

    if (!businessName) {
      errors.name = 'Business name is required'
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
      const seatGrid = generateSeatGrid(
        parseInt(selectedRow),
        parseInt(selectedColumn)
      )
      postBusiness({ business_name: businessName }, formattedPostcode, seatGrid)
        .then(() => {
          navigation.navigate('Login', { usertype: 'Business' })
          console.log('Form submitted successfully!')
          setSnackbarMessage(
            'Business account created successfully! Please go to login...'
          )
          setVisible(true)
          setPostcode('')
          setBusinessName('')
          setSelectedRow('')
          setSelectedColumn('')
          setSuccess(true)
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

  const data = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
  ]
  const data2 = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
  ]

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          Become an **APP NAME** seller
        </Text>

        <TextInput
          style={styles.textboxLight}
          placeholder="Business Name"
          value={businessName}
          onChangeText={(businessName) => setBusinessName(businessName)}
          selectionColor={'rgba(43, 29, 65, 0.1)'}
        />
        <TextInput
          style={styles.textboxLight}
          placeholder="Postcode"
          value={postcode}
          onChangeText={(postcode) => setPostcode(postcode)}
          selectionColor={'rgba(43, 29, 65, 0.1)'}
        />
        <Text
          style={{
            color: '#f5f5f5',
            fontFamily: 'Comfortaa-Regular',
            paddingRight: 20,
            paddingLeft: 20,
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          Select Seating Layout
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={(val) => setSelectedRow(val)}
              data={data}
              save="value"
              style={styles.dropdown}
              search={false}
              placeholder="Rows"
              boxStyles={{ borderRadius: 20, backgroundColor: '#f5f5f5' }}
              dropdownStyles={{ backgroundColor: '#f5f5f5', fontSize: 12 }}
              fontFamily="Comfortaa-Light"
            />
          </View>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={(val) => setSelectedColumn(val)}
              data={data2}
              save="value"
              style={styles.dropdown}
              search={false}
              placeholder="Columns"
              boxStyles={{ borderRadius: 20, backgroundColor: '#f5f5f5' }}
              dropdownStyles={{ backgroundColor: '#f5f5f5' }}
              fontFamily="Comfortaa-Light"
            />
          </View>
        </View>
        <Button
          btnText="SUBMIT"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
        {/* <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity> */}
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
    </ScrollView>
  )
}

export default BusinessSignUp
