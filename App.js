import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { styles } from "./styles-sheet";

import WelcomePage from './components/Welcome-page';



function App() {
  return (    
  <>
    <WelcomePage />
    {/* Login page */}
    {/* Create account */}
    
      <Routes>
        
      </Routes>
  </>
      
  );
}

export default App

