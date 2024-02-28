import React from 'react'
import { View } from 'react-native'
import { Button } from '../helpers'
import { styles } from '../style-sheet'
import { Text } from 'react-native'

function WelcomePage({ navigation }) {

  return (
    <View style={styles.darkContainer}>
      <View style={{flexDirection: 'column', width: '100%'}}>
        <Text
          style={{
            color: 'green',
            fontFamily: 'Comfortaa-Medium',
            fontSize: 25,
            color: '#f5f5f5',
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 10,
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
