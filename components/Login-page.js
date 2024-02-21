/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Text, TextInput, View} from 'react-native';
import { styles } from "../style-sheet"
import {Button} from "../helpers";

function Login({navigation, route}) {
    
    const usertype = route.params.usertype   
    const [loginName, setLoginName] = useState([])

    return (
        
        <View style={styles.container}>            
            <Text>Enter {usertype} username:</Text>
            <TextInput style={styles.textbox}                 
                placeholder="..." 
                onChangeText={textEntry => setLoginName(textEntry)}/>
            <Button
            btnText="Submit" 
            onPress={() => {if(usertype === 'Customer')
                                {navigation.navigate('CustomerHomepage')}
                            else if(usertype === 'Business')
                                {navigation.navigate('BusinessHomepage')}
                            }} 
            />
        </View>        
    ) 
}

export default Login