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
import { Pressable } from 'react-native'

export function PreviousOrders() {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [allOrders, setAllOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getWonAuctionsByUser(currentCustomer.user_id).then((response) => {
      setAllOrders(response.data.auctions)
      setIsLoading(false)
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
        <View style={orderHistory.topNav}>
          <Pressable style={styles.backButton}>
            <Text style={styles.backButtonText}>
              ← HOME
            </Text>
          </Pressable>
          {/* <Text>HELLO {currentCustomer.username}</Text> */}
          {/* <Button btnText={'Log out'} onPress={() => logUserOut()} /> */}
        </View>
        <Text style={orderHistory.pageHeader}>PREVIOUS ORDERS</Text>
        <Text
          style={{
            color: '#f5f5f5',
            fontFamily: 'Comfortaa-Light',
            fontSize: 12,
            textAlign: 'center',
            width: '90%',
            marginBottom: 80
          }}
        >
          Please present the collection code at the venue to collect and pay for tickets.
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
                      Collection code:{'\n'}
                      <Text style={orderHistory.info}>
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
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
