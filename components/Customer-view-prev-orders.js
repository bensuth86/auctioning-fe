import { View, Text, ScrollView } from 'react-native'
import { styles } from '../style-sheet'
import { getEventByEventId, getWonAuctionsByUser } from '../utils'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { orderHistory } from '../style-sheet-previous-orders'

export function PreviousOrders() {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    getWonAuctionsByUser(currentCustomer.user_id).then((response) => {
      setAllOrders(response.data.auctions)
    })
  }, [currentCustomer.user_id])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text>Previous orders: </Text>
        <Text>
          Will likely need to be joined with the events table so we can actually
          get some event info (name, location etc)
        </Text>
        {/* <Text>Will need a random character string added as a key</Text> */}

        <View style={orderHistory.container}>
          {allOrders.map((order, i) => (
            <View key={i} style={orderHistory.individualContainer}>
              <Text>Tickets: {order.seat_selection.length}</Text>
              <Text>
                Total price: £
                {(
                  Number(order.current_price) * order.seat_selection.length
                ).toFixed(2)}{' '}
                ({order.seat_selection.length} x £
                {Number(order.current_price).toFixed(2)})
              </Text>
              <Text>
                Collection code: {order.event_id}
                {order.auction_id}
                {currentCustomer.username[0].toUpperCase()}
                {currentCustomer.username[
                  currentCustomer.username.length - 1
                ].toUpperCase()}
                {currentCustomer.user_id}
                {order.time_ending.substring(order.time_ending.length - 4)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
