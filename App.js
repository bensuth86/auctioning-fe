/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomePage from './components/Welcome-page'
import Login from './components/Login-page'
import CustomerHomepage from './components/Customer-homepage'
import BusinessHomepage from './components/Business-homepage'
import CustomerSeating from './components/Customer-seating-selection'
import CustomerAuctionPage from './components/Customer-auctionpage'
import CustomerSignUp from './components/Customer-signup'
import CustomerContext from './Contexts/LoggedInCustomerContext'
import BusinessSignup from './components/Business-signup'
import BusinessListing from './components/Business-listing'
import BusinessCreateScreening from './components/Business-create-new-screening'
import { useState } from 'react'
import { socket } from './socket'
import { PreviousOrders } from './components/Customer-view-prev-orders'

const Stack = createNativeStackNavigator()

function App() {
  const [currentCustomer, setCurrentCustomer] = useState({
    username: null,
    user_id: null,
    postcode: null,
  })
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <CustomerContext.Provider value={{ currentCustomer, setCurrentCustomer }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome_page"
            component={WelcomePage}
            options={{ title: 'Welcome to Blost cinema auctions' }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Enter account details' }}
          />
          <Stack.Screen
            name="CustomerHomepage"
            component={CustomerHomepage}
            options={{ title: 'Customer Home' }}
          />
          <Stack.Screen
            name="BusinessHomepage"
            component={BusinessHomepage}
            options={{ title: 'Business Home' }}
          />
          <Stack.Screen
            name="SeatingPage"
            component={CustomerSeating}
            options={{ title: 'Seating Selection' }}
          />
          <Stack.Screen
            name="AuctionPage"
            component={CustomerAuctionPage}
            options={{ title: 'Auction' }}
          />
          <Stack.Screen
            name="CustomerSignUpPage"
            component={CustomerSignUp}
            options={{ title: 'Customer Sign Up' }}
          />
          <Stack.Screen
            name="BusinessSignupPage"
            component={BusinessSignup}
            options={{ title: 'Business Sign Up' }}
          />
          <Stack.Screen
            name="BusinessCreateScreening"
            component={BusinessCreateScreening}
            options={{ title: 'Business Create Screening' }}
          />
          <Stack.Screen
            name="BusinessListingPage"
            component={BusinessListing}
            options={{ title: 'Business Listing Page' }}
          />
          <Stack.Screen
            name="PreviousOrders"
            component={PreviousOrders}
            options={{ title: 'Previous orders' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CustomerContext.Provider>
  )
}

export default App
