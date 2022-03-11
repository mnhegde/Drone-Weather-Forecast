import React, {useState} from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image } from 'react-native-ui-lib';
import { Link } from 'react-router-native';
import Select, { SelectItem } from '@redmin_delishaj/react-native-select';
export default function Index() {
    //data needs to be in this form to be passed into the select
    const data = [
        { text: 'Option 1', value: 1 },
        { text: 'Option 2', value: 2 },
        { text: 'Option 3', value: 3 },
      ];
      const [selectedItem, setSelectedItem] = useState();
    return (
        <View flex center width={"100%"} height="100%">
            <View style={{position: "absolute"}} width={"100%"} height={"100%"} >
            <Image style={{width: "100%", height: "100%"}} resizeMode={"stretch"} source={require("../assets/Background.png")} key="Background" />
            </View>
            <Image  width="40%" height="20%" resizeMode={"contain"} source={require("../assets/landingIcon.png")} key="icon"/>
            <Text color="white"  center style={{fontSize: 50, fontWeight: "bold"}}>DroneScout</Text>
            <Text center color="white" style={{fontSize: 15}}>Scout the weather before you take flight!</Text>
            <View backgroundColor='white' height={"5%"} center style={{marginTop:"5%", borderRadius: 20,  flexDirection: "row", justifyContent: "space-between"}}>
                <Select textBoxStyle={{height: "70%", borderRadius: 20}} width={"85%"}  data={data}onSelect={value => setSelectedItem(value)}value={selectedItem} />
                <Link to="/data">
                    <Image style={{marginRight:"2%",}} source={require("../assets/arrow.png")} key="arrow"/>
                    </Link>
            </View>
        </View>
    )
}

