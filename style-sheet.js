import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: { // custom buttons
      margin: 10,
      padding: 30,
      borderRadius: 8,
      backgroundColor: "pink",
    },
    buttontext: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        
        
      },
    textbox: { // for text entry
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10, 
      width: 200,
      
    },
    eventcard: { // customer events card
      flex: 1,
      flexDirection: "column", // aligned vertically
      flexWrap: "wrap", // fit items within container
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: 10,
      borderWidth: 3,
      borderRadius: 8,
      padding: 20,      
    }
    })