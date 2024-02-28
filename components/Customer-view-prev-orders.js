import { View, Text, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { getEventByEventId, getWonAuctionsByUser } from '../utils'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { orderHistory } from '../style-sheet-previous-orders'
import { Image } from 'react-native'
import { convertTime } from '../helpers'
import { ActivityIndicator } from 'react-native-paper'
import { homeStyles } from '../style-sheet-customer-home'
import { Pressable, Modal } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { Button } from '../helpers'

export function PreviousOrders({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [allOrders, setAllOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showQRCode, setShowQRCode] = useState(false)
  const [QRCodeStr, setQRCodeStr] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getWonAuctionsByUser(currentCustomer.user_id)
      .then((response) => {
        setAllOrders(response.data.auctions)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.response.data.msg === 'User not found.') {
          setErrorMessage(
            'Sorry - your user ID does not exist.\nCannot fetch your previous orders.'
          )
        }
        if (err.response.data.msg === 'Bad request') {
          setErrorMessage(
            'Sorry - your user ID is invalid.\nCannot fetch your previous orders.'
          )
        }
      })
  }, [currentCustomer.user_id])

  if (isLoading)
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color="red" />
      </View>
    )

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.darkContainer}>
        <Modal animationType="slide" transparent={true} visible={showQRCode}>
          <View
            style={{
              height: '50%',
              width: '100%',
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
              position: 'absolute',
              bottom: 0,
            }}
          >
            <View
              style={{
                height: '16%',
                backgroundColor: '#e00c3e',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={orderHistory.cardHeaderBold}>Your QR Code</Text>
              <Pressable
                onPress={() => {
                  setShowQRCode(false)
                  setQRCodeStr('')
                }}
              >
                <Text
                  style={{
                    color: '#f5f5f5',
                    fontFamily: 'Comfortaa-Light',
                    fontSize: 12,
                  }}
                >
                  CLOSE
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
                paddingHorizontal: 20,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QRCode value={QRCodeStr} size={160} />
              <Text
                style={{
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 14,
                  marginTop: 5,
                }}
              >
                {QRCodeStr}
              </Text>
              <Text
                style={{
                  fontFamily: 'Comfortaa-Light',
                  fontSize: 14,
                  marginTop: 10,
                  textAlign: 'center',
                }}
              >
                Simply show this code when picking up your tickets.
              </Text>
              <Text>{QRCode}</Text>
            </View>
          </View>
        </Modal>
        <View style={{margin: 20}}

        >
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('CustomerHomepage')}
          >
            <Text style={styles.backButtonText}>HOME</Text>
          </Pressable>
        </View>
        <Text style={orderHistory.pageHeader}>PREVIOUS ORDERS</Text>
        {errorMessage !== '' && (
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <Text style={styles.error}>{errorMessage}</Text>
          </View>
        )}
        {errorMessage === '' && (
          <>
            <Text
              style={{
                color: '#f5f5f5',
                fontFamily: 'Comfortaa-Light',
                fontSize: 12,
                textAlign: 'center',
                width: '90%',
                marginBottom: 80,
              }}
            >
              Please present the QR code at the venue to collect and pay for
              tickets.
            </Text>
            {allOrders.length === 0 ? (
              <Text style={styles.error}>Looks like you have no orders!</Text>
            ) : (
              <View style={orderHistory.container}>
                {allOrders.map((order, i) => (
                  <>
                    <Text style={orderHistory.cardHeader}>
                      <Text style={orderHistory.cardHeaderBold}>
                        {order.film_title},
                      </Text>{' '}
                      {'\n'}
                      {order.business_name}
                    </Text>
                    <View key={i} style={orderHistory.individualContainer}>
                      <Image
                        source={{ uri: order.poster }}
                        style={{ width: 150.5, height: 230 }}
                      />
                      <View style={orderHistory.rightSideContainer}>
                        <Text style={orderHistory.sideInfoHeaders}>
                          Screening date:{'\n'}
                          <Text style={orderHistory.info}>
                            {convertTime(order.start_time)}
                          </Text>
                        </Text>
                        <Text style={orderHistory.sideInfoHeaders}>
                          Total price:{'\n'}
                          <Text style={orderHistory.info}>
                            £
                            {(
                              Number(order.current_price) *
                              order.seat_selection.length
                            ).toFixed(2)}{' '}
                            ({order.seat_selection.length} x £
                            {Number(order.current_price).toFixed(2)})
                          </Text>
                        </Text>
                        <Text style={orderHistory.sideInfoHeaders}>
                          QR Code:{'\n'}
                          {/* <Text style={orderHistory.info}>
                        {order.event_id}
                        {order.auction_id}
                        {currentCustomer.username[0].toUpperCase()}
                        {currentCustomer.username[
                          currentCustomer.username.length - 1
                        ].toUpperCase()}
                        {currentCustomer.user_id}
                        {order.time_ending.substring(
                          order.time_ending.length - 4
                        )}
                      </Text> */}
                          <Button
                            key={`button-${order.auction_id}`}
                            btnText={'VIEW'}
                            onPress={() => {
                              setQRCodeStr(
                                `${order.event_id}${order.auction_id}${currentCustomer.username[0].toUpperCase()}${currentCustomer.username[
                                  currentCustomer.username.length - 1
                                ].toUpperCase()}${currentCustomer.user_id}${order.time_ending.substring(
                                  order.time_ending.length - 4
                                )}`
                              )
                              setShowQRCode(true)
                            }}
                          ></Button>
                        </Text>
                      </View>
                    </View>
                  </>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  )
}
