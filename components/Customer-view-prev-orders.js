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

export function PreviousOrders() {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    getWonAuctionsByUser(currentCustomer.user_id).then((response) => {
      console.log(response.data.auctions)
      setAllOrders(response.data.auctions)
    })
  }, [currentCustomer.user_id])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text>Previous orders: </Text>
        <Text>Previous history info - please present at the cinema to collect and pay for tickets</Text>
        {allOrders.length === 0 ? (
          <Text>Looks like you have no orders!</Text>
        ) : (
          <View style={orderHistory.container}>
            {allOrders.map((order, i) => (
              <View key={i} style={orderHistory.individualContainer}>
                <Image
                  source={{ uri: order.poster }}
                  style={{ width: 150.5, height: 'auto' }}
                />
                <View style={orderHistory.rightSideContainer}>
                  <Text style={orderHistory.info}>{order.film_title}</Text>
                  <Text style={orderHistory.info}>
                    {order.business_name}
                  </Text>
                  <Text style={orderHistory.info}>{convertTime(order.start_time)}</Text>
                  {/* <Text>Tickets: {order.seat_selection.length}</Text> */}
                  <Text style={orderHistory.info}>
                    Total price: £
                    {(
                      Number(order.current_price) * order.seat_selection.length
                    ).toFixed(2)}{' '}
                    ({order.seat_selection.length} x £
                    {Number(order.current_price).toFixed(2)})
                  </Text>
                  <Text style={orderHistory.info}>
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
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
