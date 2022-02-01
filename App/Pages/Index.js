import React from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Link } from 'react-router-native'

export default function Index() {
    return (
        <View flex center>
            <Text>Home!</Text>
            <Link to="/settings"><Text>Settings</Text></Link>
        </View>
    )
}

