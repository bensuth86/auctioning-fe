import { View } from 'react-native'
import { Text } from 'react-native'
import { styles } from '../style-sheet'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { getCurrentAuctionsByUser } from '../utils'
import { useEffect } from 'react'
import { useState } from 'react'
import { convertTime } from '../helpers'
import { TouchableOpacity } from 'react-native-web'
import { useFocusEffect } from '@react-navigation/native';
import { currentAuctions } from '../style-sheet-current-auctions'

export function CurrentAuction() {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [userActiveAuctions, setUserActiveAuctions] = useState([])

  useEffect(() => {
    getCurrentAuctionsByUser(currentCustomer.user_id).then((response) => {
      const activeAuctions = response.data.auctions.filter((auction) => {
        return auction.active === true
      })
      setUserActiveAuctions(activeAuctions)
    })
  }, [currentCustomer.user_id, userActiveAuctions])

  return (
    userActiveAuctions.length > 0 && (
      <View style={styles.container}>
        <Text>Currently bidding on:</Text>
        {userActiveAuctions.map((auction, i) => {
          return (
            <View key={i} style={currentAuctions.container}>
              <Text>{auction.film_title}</Text>
              <Text>{auction.business_name}, {auction.postcode}</Text>
              {/* <Text>{auction.postcode}</Text> */}
              <Text>Screening date: {convertTime(auction.start_time)}</Text>
              <Text>Auction ends in: {convertTime(auction.time_ending)}</Text>
              <Text>Seats for auction: {auction.seat_selection.join(', ')}</Text>
              <Text>
                Current bid: £{Number(auction.current_price).toFixed(2)}
              </Text>
              <Text>Bidders: {auction.users_involved.length}</Text>
              {auction.current_highest_bidder === currentCustomer.user_id ? (
                <Text>Status: Winning</Text>
              ): (
                <Text>Status: Loosing</Text>
              )}
            </View>
          )
        })}
      </View>
    )
  )
}
