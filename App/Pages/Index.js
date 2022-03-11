import React, { useState, useEffect } from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image } from 'react-native-ui-lib';
import { Link } from 'react-router-native';
import Select from '@redmin_delishaj/react-native-select';
export default function Index() {
    const [cities, setCities] = useState({})
    const [selectedItem, setSelectedItem] = useState();
    useEffect(() => {
        fetch("http://20.90.82.229:5000/cities")
            .then(response => response.json())
            .then(json => {
                console.log(json)
                let obj = []
                json["city_domains"].map((data, i) => {
                    return obj.push({ text: data, value: i })
                })
                setCities(obj)
            })
    }, [])
    return (
        <View flex center width={"100%"} height="100%">
            <View style={{ position: "absolute" }} width={"100%"} height={"100%"} >
                <Image style={{ width: "100%", height: "100%" }} resizeMode={"stretch"} source={require("../assets/Background.png")} key="Background" />
            </View>
            <Image width="40%" height="20%" resizeMode={"contain"} source={require("../assets/landingIcon.png")} key="icon" />
            <Text color="white" center style={{ fontSize: 50, fontWeight: "bold" }}>DroneScout</Text>
            <Text center color="white" style={{ fontSize: 15 }}>Scout the weather before you take flight!</Text>
            <View backgroundColor='white' height={"5%"} center style={{ marginTop: "5%", borderRadius: 20, flexDirection: "row", justifyContent: "space-between" }}>
                <Select textBoxStyle={{ height: "70%", borderRadius: 20 }} width={"85%"} data={cities} onSelect={value => setSelectedItem(value)} value={selectedItem} />
                <Link to="/data">
                    <Image style={{ marginRight: "2%", }} source={require("../assets/arrow.png")} key="arrow" />
                </Link>
            </View>
        </View>
    )
}

