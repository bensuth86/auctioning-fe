import React, { useState, useEffect } from 'react'
import { View, TextInput, Text } from 'react-native'
import { styles } from '../style-sheet'
import { Snackbar } from 'react-native-paper'
import { postBusiness } from '../utils'
import { SelectList } from 'react-native-dropdown-select-list'
import { generateSeatGrid } from '../helpers'
import { Button } from '../helpers'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

function BusinessSignUp({ navigation }) {
  const [businessName, setBusinessName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [selectedRow, setSelectedRow] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('')
  const [loading, isLoading] = useState(false)

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
      isLoading(true)
      const formattedPostcode = postcode.replace(/\s/g, '').toUpperCase()
      const seatGrid = generateSeatGrid(
        parseInt(selectedRow),
        parseInt(selectedColumn)
      )
      postBusiness({ business_name: businessName }, formattedPostcode, seatGrid)
        .then((response) => {
          isLoading(false)
          navigation.navigate('BusinessHomepage', {
            business_id: response.business.business_id,
            success: null,
          })
          setPostcode('')
          setBusinessName('')
          setSelectedRow('')
          setSelectedColumn('')
        })
        .catch((error) => {
          isLoading(false)
          setSnackbarMessage('Failed to submit form. Please try again.')
          setVisible(true)
        })
    }
  }
  console.log(selectedRow)
  const data = [
    { key: '1', value: '1 row' },
    { key: '2', value: '2 rows' },
    { key: '3', value: '3 rows' },
    { key: '4', value: '4 rows' },
    { key: '5', value: '5 rows' },
    { key: '6', value: '6 rows' },
    { key: '7', value: '7 rows' },
  ]
  const data2 = [
    { key: '1', value: '1 column' },
    { key: '2', value: '2 columns' },
    { key: '3', value: '3 columns' },
    { key: '4', value: '4 columns' },
    { key: '5', value: '5 columns' },
    { key: '6', value: '6 columns' },
    { key: '7', value: '7 columns' },
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
          Become a TicketDash seller
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
          Your venue's seating layout:
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
              defaultOption={''}
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
        {loading ? (
          <View>
            <ActivityIndicator color="red" size={'large'} />
          </View>
        ) : (
          <Button
            btnText="SUBMIT"
            onPress={handleSubmit}
            disabled={!isFormValid}
          />
        )}
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
