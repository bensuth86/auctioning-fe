import React from 'react'
import { View } from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { Text } from 'react-native'

function WelcomePage({ navigation }) {
  return (
    <View style={styles.darkContainer}>
      <View style={{ flexDirection: 'column', width: '100%' }}>
        <Text
          style={{
            fontFamily: 'Comfortaa-Medium',
            fontSize: 25,
            color: '#f5f5f5',
            paddingRight: 20,
            paddingLeft: 20,
            textAlign: 'center',
            lineHeight: 40,
            marginBottom: 40
          }}
        >
          <Text style={{ color: 'rgba(255, 255, 255, 0.4)' }}>WELCOME TO</Text>
          {'\n'}TicketDash
        </Text>
        <Text
          style={{
            fontFamily: 'Comfortaa-Regular',
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.4)',
            paddingRight: 20,
            paddingLeft: 20,
            textAlign: 'center',
            marginBottom: 40
          }}
        >
          Win movie tickets with bids. Experience cinema for less.
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
