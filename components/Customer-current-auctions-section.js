import { View, TouchableOpacity, Button } from 'react-native'
import { Text } from 'react-native'
import { styles } from '../style-sheet'
import CustomerContext from '../Contexts/LoggedInCustomerContext'
import { useContext } from 'react'
import { getCurrentAuctionsByUser } from '../utils'
import { useEffect } from 'react'
import { useState } from 'react'
import { convertTime } from '../helpers'
import { currentAuctions } from '../style-sheet-current-auctions'
import { ActivityIndicator } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export function CurrentAuction({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [userActiveAuctions, setUserActiveAuctions] = useState([])
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    getCurrentAuctionsByUser(currentCustomer.user_id).then((response) => {
      const activeAuctions = response.data.auctions.filter((auction) => {
        return auction.active === true
      })
      setUserActiveAuctions(activeAuctions)
      setLoading(true)
    })
  }, [isFocused])

  // if (!loading)
  //   return (
  //     <View style={styles.darkContainer}>
  //       <ActivityIndicator color="red" />
  //     </View>
  //   )

  return (
    userActiveAuctions.length > 0 && (
      <View>
        <Text
          style={{
            color: '#f5f5f5',
            textAlign: 'center',
            fontFamily: 'Comfortaa-Regular',
            marginBottom: 10,
          }}
        >
          YOUR LIVE AUCTIONS:{' '}
        </Text>
        {!loading && (
          <View style={{ padding: 20 }}>
            <ActivityIndicator color="red" />
          </View>
        )}
        {loading &&
          userActiveAuctions.map((auction, i) => (
            <TouchableOpacity
              key={`auction-${i}`}
              onPress={() =>
                navigation.navigate('AuctionPage', {
                  selectedAuction: auction.auction_id,
                  event_id: { event_id: auction.event_id },
                  business_id: { business_id: auction.business_id },
                  film_title: { film_title: auction.film_title },
                  poster: { poster: auction.poster },
                  certificate: { certificate: auction.certificate },
                  run_time: { run_time: auction.run_time },
                  start_time: { start_time: auction.start_time },
                  seat_selection: { selectedSeats: auction.seat_selection },
                })
              }
            >
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
                    You are{' '}
                    <Text style={currentAuctions.textBold}>winning!</Text>
                  </Text>
                ) : (
                  <Text style={currentAuctions.text}>
                    You are{' '}
                    <Text style={currentAuctions.textBold}>loosing!</Text>
                  </Text>
                )}
                <Text style={{ textAlign: 'left' }}>
                  <MaterialCommunityIcons
                    name="cursor-default-click"
                    size={20}
                    color="#f5f5f5"
                  />
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    )
  )
}
