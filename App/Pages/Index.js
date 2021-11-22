import React from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'

export default function Index() {
    return (
        <View>
            <Text>Home!</Text>
            <Link to="/settings"><Text>Settings</Text></Link>
        </View>
    )
}

