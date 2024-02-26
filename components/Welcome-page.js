import React from 'react'
import { View } from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { Text } from 'react-native'
import { useFonts } from 'expo-font'
import { useState } from 'react'
// import { useState } from 'react'

function WelcomePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Comfortaa-Bold': require('../assets/Fonts/Comfortaa-Bold.ttf'),
    'Comfortaa-Light': require('../assets/Fonts/Comfortaa-Light.ttf'),
    'Comfortaa-Medium': require('../assets/Fonts/Comfortaa-Medium.ttf'),
    'Comfortaa-Regular': require('../assets/Fonts/Comfortaa-Regular.ttf'),
    'Comfortaa-SemiBold': require('../assets/Fonts/Comfortaa-SemiBold.ttf'),
  })
  return (
    <View style={styles.darkContainer}>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: 'green',
            fontFamily: 'Comfortaa-Medium',
            fontSize: 25,
            color: '#f5f5f5',
            paddingRight: 20,
            paddingLeft: 20,
            textAlign: 'center',
          }}
        >
          WELCOME TO 'xxxxxxxxxxxxxx'
        </Text>
        <Button
          btnText="CUSTOMER ACCOUNT"
          onPress={() => navigation.navigate('Login', { usertype: 'Customer' })}
        />
        <Button
          btnText="BUSINESS ACCOUNT"
          onPress={() => {
            navigation.navigate('Login', { usertype: 'Business' })
          }}
        />
      </View>
    </View>
  )
}

export default WelcomePage
