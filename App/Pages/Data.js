import React, { useState, useEffect } from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image, Dialog, PanningProvider } from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
export default function Data() {
  const [search, setSearch] = useState(false)
  const [settings, setSettings] = useState(false)
  const [layerData, setLayerData] = useState(["1000 ft", "400 ft"])
  const [countries, setCountries] = useState(["LA, CA"])
  function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : (b ? b : a)
    }
  }
  let renderLayers = layerData.map((data,i)=>{
      return(<View centerH style={{ flexDirection: "column", marginTop: "2%" }}> 
      <Text onPress={null/*NEED A FUNCTION HERE TO UPDATE DATA */} center color='white' style={{ fontSize: 20, borderColor: "#8FD9FF", borderWidth: "2px", borderRadius: "9%", ...padding(10, 25, 10, 25), width: "35%" }}>{data}</Text> 
      </View>)
    })
  let renderCountries = countries.map((data,i)=>{
    return(<TouchableOpacity ><Text color="grey" style={{ fontSize: 25, fontWeight: "bold", marginLeft: "3%" }}>{data}</Text></TouchableOpacity>)
  })
  return (
    <View flex centerH width={"100%"} height="100%">
      <View style={{ position: "absolute" }} width={"100%"} height={"100%"} >
        <Image width={"100%"} height={"100%"} resizeMode={"stretch"} source={require("../assets/BackgroundData.png")} key="Background" />
      </View>
      <Text color="white" center style={{ fontSize: 30, fontWeight: "bold", marginTop: "10%", marginBottom: "10%" }}>DroneScout</Text>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: "85%", borderRadius: "15%" }}>
        <View center style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View centerH centerV style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image resizeMode={"center"} source={require("../assets/Rainfall.png")} key="Rainfall" />
            <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Chance of Rain</Text>
          </View>
         
        </View>
        <View center style={{ flexDirection: "column", justifyContent: "space-between", marginBottom: "3%" }}>
           <Text color="white" center style={{ fontSize: 20, fontWeight: "bold", marginRight: "3%", marginBottom: "3%" }}>50%</Text>
         <Progress.Bar  progress={0.5} width={200} color="white" />
     
          </View>
           <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginBottom: "3%" }}>Source: Metroblue</Text>

      </View>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: "85%", borderRadius: "15%", marginTop: "5%" }}>
        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} source={require("../assets/Wind.png")} key="Wind" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Wind</Text>
        </View>
        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>400+ ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>5 knots</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>S @</Text>
        </View>
        <Image width={"100%"} resizeMode={"stretch"} source={require("../assets/Seperator.png")} key="Rainfall" />
        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>0-400 ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>5 knots</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>S @</Text>
        </View>

        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Metroblue</Text>
      </View>

      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: "85%", borderRadius: "15%", marginTop: "5%" }}>
        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} source={require("../assets/Turbulence.png")} key="Turbulence" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Turbulent Atmospheric Layers</Text>
        </View>
        {renderLayers}
  
        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Metroblue</Text>
      </View>

      <View width={"100%"} centerV backgroundColor="white" style={{ marginTop: "auto", borderRadius: "15%" }} height={"10%"} >
        <View style={{ justifyContent: "space-between", flexDirection: "row", }} >
          <Text color="grey" style={{ fontSize: 35, fontWeight: "bold", marginLeft: "3%" }}>City, Country</Text>
          <View style={{ flexDirection: "row", marginRight: "3%", justifyContent: "space-between" }} width="20%">
            <TouchableOpacity onPress={() => setSearch(true)}>
              <Image resizeMode={"stretch"} source={require("../assets/Search.png")} key="Search" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSettings(true)}>
              <Image resizeMode={"stretch"} source={require("../assets/Settings.png")} key="Settings" />
            </TouchableOpacity>

          </View>
        </View>

      </View>
      <Dialog visible={search} onDismiss={() => setSearch(false)} panDirection={PanningProvider.Directions.DOWN}>
        {<View width={"100%"} backgroundColor="white" style={{ borderRadius: "15%" }}>
          <View centerH style={{ flexDirection: "row", marginLeft: "3%", marginRight: "3%", borderBottomWidth: "2px", borderBottomColor: "#E6E6E6", borderBottomRadius: "5%" }}>
            <Image resizeMode={"stretch"} source={require("../assets/Search.png")} key="Search" />
            <Text color="grey" style={{ fontSize: 35, fontWeight: "bold", marginLeft: "3%" }}>Location Select</Text>
          </View>
          {renderCountries}
        </View>}
      </Dialog>

      <Dialog visible={settings} onDismiss={() => setSettings(false)} panDirection={PanningProvider.Directions.DOWN}>
        {<View width={"100%"} backgroundColor="white" style={{ borderRadius: "15%" }}>
          <View centerH style={{ flexDirection: "row", marginLeft: "3%", marginRight: "3%", borderBottomWidth: "2px", borderBottomColor: "#E6E6E6", borderBottomRadius: "5%" }}>
            <Image resizeMode={"stretch"} source={require("../assets/Settings.png")} key="Settings" />
            <Text color="grey" style={{ fontSize: 35, fontWeight: "bold", marginLeft: "3%" }}>Settings</Text>
          </View>
          
        </View>}
      </Dialog>
    </View>
  )
}