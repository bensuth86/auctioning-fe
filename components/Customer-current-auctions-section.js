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
import { Feather } from '@expo/vector-icons'

export function CurrentAuction({ navigation }) {
  const { currentCustomer, setCurrentCustomer } = useContext(CustomerContext)
  const [userActiveAuctions, setUserActiveAuctions] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    getCurrentAuctionsByUser(currentCustomer.user_id)
      .then((response) => {
        const activeAuctions = response.data.auctions.filter((auction) => {
          return auction.active === true
        })
        setUserActiveAuctions(activeAuctions)
        setLoading(true)
      })
      .catch((err) => {
        setLoading(true)
        if (err.response.data.msg === 'User not found.') {
          setErrorMessage(
            'Sorry - your user ID does not exist.\nCannot fetch your current auctions.'
          )
        }
        if (err.response.data.msg === 'Bad request') {
          setErrorMessage(
            'Sorry - your user ID is invalid.\nCannot fetch your current auctions.'
          )
        }
      })
  }, [isFocused])

  if (errorMessage !== '') {
    return (
      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    )
  }

  if (errorMessage === '') {
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
              <ActivityIndicator color="red" size={'large'}/>
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
                  <View style={currentAuctions.left}>
                    <Text style={{ textAlign: 'left', paddingLeft: 10 }}>
                      <Feather name="mouse-pointer" size={20} color="#f5f5f5" accessibilityLabel="click icon"/>
                    </Text>
                  </View>
                  <View style={currentAuctions.right}>
                    <Text style={currentAuctions.textBold}>
                      {auction.film_title}, {'\n'}
                      {auction.business_name}
                    </Text>
                    <Text style={currentAuctions.text}>
                      Bidding on{' '}
                      <Text style={currentAuctions.textBold}>
                        {auction.seat_selection.join(', ')}
                      </Text>{' '}
                      {'\n'}
                      at{' '}
                      <Text style={currentAuctions.textBold}>
                        £{Number(auction.current_price).toFixed(2)}
                      </Text>{' '}
                      per seat
                    </Text>
                    <Text style={currentAuctions.text}>
                      Ends:{'\n'}
                      <Text style={currentAuctions.textBold}>
                        {convertTime(auction.time_ending)}
                      </Text>
                    </Text>
                    <Text style={currentAuctions.text}>
                      <Text style={currentAuctions.textBold}>
                        {auction.users_involved.length}
                      </Text>{' '}
                      bidders involved...{'\n'}
                      {auction.current_highest_bidder ===
                      currentCustomer.user_id ? (
                        <Text style={currentAuctions.text}>
                          You are{' '}
                          <Text
                            style={[
                              currentAuctions.textBold,
                              { color: '#7bc47f' },
                            ]}
                          >
                            winning!
                          </Text>
                        </Text>
                      ) : (
                        <Text style={currentAuctions.text}>
                          You are{' '}
                          <Text
                            style={[currentAuctions.textBold, { color: 'red' }]}
                          >
                            losing!
                          </Text>
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )
    )
  }
}
