import React from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image} from 'react-native-ui-lib';
import { Link } from 'react-router-native';
import { TextInput } from 'react-native';

export default function Index() {
    return (
        <View flex center width={"100%"} height="100%">
            <View style={{position: "absolute"}} width={"100%"} height={"100%"} >
            <Image width={"100%"} height={"100%"} resizeMode={"stretch"} source={require("../assets/Background.png")} key="Background" />
            </View>
            <Image  width="40%" height="20%" resizeMode={"contain"} source={require("../assets/landingIcon.png")} key="icon"/>
            <Text color="white"  center style={{fontSize: 50, fontWeight: "bold"}}>DroneScout</Text>
            <Text center color="white" style={{fontSize: 15}}>Scout the weather before you take flight!</Text>
            <View backgroundColor='white' style={{marginTop:"5%", borderRadius: 20, flexDirection: "row", justifyContent: "space-between"}}>
                <TextInput style={{marginTop: "2%", marginBottom: "2%", marginLeft: "2%", width:"75%", fontSize: 20, color: "#707070"}} placeholder='Search for a location...'/>
                <Image style={{marginTop: "2%", marginBottom: "2%", marginRight:"2%",}} source={require("../assets/arrow.png")} key="arrow"/>
            </View>
            
        
        </View>
    )
}

