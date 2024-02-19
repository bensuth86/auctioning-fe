import { useEffect, useState } from "react";
import {Text, TextInput, View} from 'react-native';


function BusinessLogin() {

    const [loginName, setLoginName] = useState([])
    const [isLoading, SetIsLoading] = useState([])

    if (isLoading) return <p>Loading...</p>
    return (
        <View style={styles.container}>
            <TextInput 
                style={{height: 40}}
                placeholder="Enter business username" 
                onChangeText={newText => setLoginName(newText)}
                defaultValue={loginName}
            />
        </View> 

    ) 
}

export default BusinessLogin

