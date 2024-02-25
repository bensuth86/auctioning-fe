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
import { useFocusEffect } from '@react-navigation/native'
import { currentAuctions } from '../style-sheet-current-auctions'
import { ActivityIndicator } from 'react-native-paper'

export function CurrentAuction() {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [userActiveAuctions, setUserActiveAuctions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCurrentAuctionsByUser(currentCustomer.user_id).then((response) => {
      const activeAuctions = response.data.auctions.filter((auction) => {
        return auction.active === true
      })
      setLoading(true)
      setUserActiveAuctions(activeAuctions)
    })
  }, [currentCustomer.user_id, userActiveAuctions])

  if (!loading)
    return (
      <View style={styles.darkContainer}>
        <ActivityIndicator color='red'/>
      </View>
    )

  return (
    userActiveAuctions.length > 0 && (
      <View>
        <Text>Currently bidding on:</Text>
        {userActiveAuctions.map((auction, i) => {
          return (
            <View key={i} style={currentAuctions.container}>
              <Text style={currentAuctions.textBold}>
                {auction.film_title}, {auction.business_name}
              </Text>
              {/* <Text style={currentAuctions.text}>{auction.business_name}, {auction.postcode}</Text> */}
              {/* <Text>{auction.postcode}</Text> */}
              <Text style={currentAuctions.text}>
                Bidding on{' '}
                <Text style={currentAuctions.textBold}>
                  {auction.seat_selection.join(', ')}
                </Text>{' '}
                at{' '}
                <Text style={currentAuctions.textBold}>
                  £{Number(auction.current_price).toFixed(2)}
                </Text>
              </Text>
              {/* <Text style={currentAuctions.text}>Screening date: {convertTime(auction.start_time)}</Text> */}
              <Text style={currentAuctions.text}>
                Auction ends in:{' '}
                <Text style={currentAuctions.textBold}>
                  {convertTime(auction.time_ending)}
                </Text>
              </Text>
              {/* <Text style={currentAuctions.text}>
                Current bid: £{Number(auction.current_price).toFixed(2)}
              </Text> */}
              <Text style={currentAuctions.text}>
                <Text style={currentAuctions.textBold}>
                  {auction.users_involved.length}
                </Text>{' '}
                bidders involved
              </Text>
              {auction.current_highest_bidder === currentCustomer.user_id ? (
                <Text style={currentAuctions.text}>
                  You are <Text style={currentAuctions.textBold}>winning!</Text>
                </Text>
              ) : (
                <Text style={currentAuctions.text}>
                  You are <Text style={currentAuctions.textBold}>loosing!</Text>
                </Text>
              )}
            </View>
          )
        })}
      </View>
    )
  )
}
