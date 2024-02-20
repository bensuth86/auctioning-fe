import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "./style-sheet"

// TouchableOpacity.defaultProps = { activeOpacity: 0.8 }

function Button({btnText, onPress}) {
    
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
            <Text style={styles.buttontext}>{btnText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

export default Button