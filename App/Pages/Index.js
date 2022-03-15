import React, { useState, useEffect } from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image } from 'react-native-ui-lib';
import { Link } from 'react-router-native';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index() {
    const [cities, setCities] = useState({})
    const [canChange, setCanChange] = useState(false)
    //const [selectedItem, setSelectedItem] = useState();
    useEffect(() => {
        fetch("http://20.90.82.229:5000/cities")
            .then(response => response.json())
            .then(json => {
                let obj = []
                json["city_domains"].map((data, i) => {
                    return obj.push(data)
                })
                setCities(obj)
            })
    }, [])
    async function selected(city){
        await AsyncStorage.setItem("city",city)
        setCanChange(true)
        console.log(canChange)
    }
    return (
        <View flex center width={"100%"} height="100%">
            <View style={{ position: "absolute" }} width={"100%"} height={"100%"} >
                <Image style={{ width: "100%", height: "100%" }} resizeMode={"stretch"} source={require("../assets/Background.png")} key="Background" />
            </View>
            <Image width="40%" height="20%" resizeMode={"contain"} source={require("../assets/landingIcon.png")} key="icon" />
            <Text color="white" center style={{ fontSize: 50, fontWeight: "bold" }}>DroneScout</Text>
            <Text center color="white" style={{ fontSize: 15 }}>Scout the weather before you take flight!</Text>
            <View backgroundColor='white' height={"5%"} center style={{ marginTop: "5%", borderRadius: 20, flexDirection: "row", justifyContent: "space-between" }}>
                <SelectDropdown rowTextStyle={{ color: "#707070" }} dropdownStyle={{ borderRadius: 20 }} buttonTextStyle={{ color: "#707070" }} buttonStyle={{ backgroundColor: "white", height: "70%", borderRadius: 20, width: "70%" }} data={cities} onSelect={(selectedItem, index) => {selected(selectedItem)}} />
                {canChange && (
                    <Link to="/data">
                        <Image style={{ marginRight: "2%", }} source={require("../assets/arrow.png")} key="arrow" />
                    </Link>
                )}
            </View>
        </View>
    )
}

