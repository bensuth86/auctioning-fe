/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './components/Welcome-page';
import Login from "./components/Login-page";
import CustomerHomepage from "./components/Customer-homepage";
import BusinessHomepage from "./components/Business-homepage";

const Stack = createNativeStackNavigator();

function App() {
  return (    
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Welcome_page" component={WelcomePage} options={{title: "Welcome to Blost cinema auctions"}}/>
      <Stack.Screen name="Login" component={Login} options={{title: "Enter account details"}}/>
      <Stack.Screen name="CustomerHomepage" component={CustomerHomepage} options={{title: "Customer Home"}}/>
      <Stack.Screen name="BusinessHomepage" component={BusinessHomepage} options={{title: "Business Home"}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App

