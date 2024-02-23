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
      padding: 10,
      borderRadius: 8,
      backgroundColor: "pink",
    },
    buttontext: {
        fontSize: 16,
        // lineHeight: 21,
        // fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center'
      },
    textbox: { // for text entry
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10, 
      width: 200,
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    dropdown: {
      minWidth: 50,
      maxWidth: 50,
      width: 50,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: '#777',
    },
    })