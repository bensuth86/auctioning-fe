import { StyleSheet } from "react-native";

export const eventStyles = StyleSheet.create({
eventcard: { // customer events card      
    flexWrap: "wrap", // fit items within container
    backgroundColor: '#66808080',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 8,
    padding: 20,      
  },
eventslist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 'auto',
    gap: 10,
    }
})