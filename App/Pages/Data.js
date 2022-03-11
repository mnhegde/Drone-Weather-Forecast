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
  const [rainWarning, setRainWarning] = useState(false)
  const [windWarning, setWindWarning] = useState(false)
  const [turbulenceWarning, setTurbulenceWarning] = useState(false)
  const [floodWarning, setFloodWarning] = useState(false)
  const [usingFt, setUsingFt] = useState(true)
  const [usingKnots, setUsingKnots] = useState(true)

  function toggleFt() {
    if (usingFt) setUsingFt(false)
    else setUsingFt(true)
  }
  function toggleKnots() {
    if (usingKnots) setUsingKnots(false)
    else setUsingKnots(true)
  }

  function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : (b ? b : a)
    }
  }
  function getDir(angle) {
    var directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 22.5) % 16;
    return directions[index]
  }

  const arrows = {
    "N": require("../assets/N.png"),
    "NNE": require("../assets/NNE.png"),
    "NE": require("../assets/NE.png"),
    "E": require("../assets/E.png"),
    "ESE": require("../assets/ESE.png"),
    "SE": require("../assets/SE.png"),
    "S": require("../assets/S.png"),
    "SSW": require("../assets/SSW.png"),
    "SW": require("../assets/SW.png"),
    "WSW": require("../assets/WSW.png"),
    "W": require("../assets/W.png"),
    "WNW": require("../assets/WNW.png"),
    "NW": require("../assets/NW.png"),
    "NNW": require("../assets/NNW.png"),
  }

  let renderLayers = layerData.map((data, i) => {
    return (<View centerH style={{ flexDirection: "column", marginTop: "2%" }}>
      <Text onPress={null/*NEED A FUNCTION HERE TO UPDATE DATA */} center color='white' style={{ fontSize: 20, borderColor: "#8FD9FF", borderWidth: "2px", borderRadius: "9%", ...padding(10, 25, 10, 25), width: "35%" }}>{data}</Text>
    </View>)
  })
  let renderCountries = countries.map((data, i) => {
    return (<TouchableOpacity ><Text color="grey" style={{ fontSize: 25, fontWeight: "bold", marginLeft: "3%" }}>{data}</Text></TouchableOpacity>)
  })
  return (
    <View flex centerH width={"100%"} height="100%">
      <View style={{ position: "absolute" }} width={"100%"} height={"100%"} >
        <Image width={"100%"} height={"100%"} resizeMode={"stretch"} source={require("../assets/BackgroundData.png")} key="Background" />
      </View>
      <Text color="white" center style={{ fontSize: 30, fontWeight: "bold", marginTop: "10%", marginBottom: "10%" }}>DroneScout</Text>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ flexDirection: "column", opacity: "85%", borderRadius: "15%" }}>
        {rainWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: "15%" }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High chance of rain</Text>
            </View>
          </View>
        )}


        <View center style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View centerH centerV style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image resizeMode={"center"} source={require("../assets/Rainfall.png")} key="Rainfall" />
            <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Chance of Rain</Text>
          </View>

        </View>
        <View center style={{ flexDirection: "column", justifyContent: "space-between", marginBottom: "3%" }}>
          <Text color="white" center style={{ fontSize: 20, fontWeight: "bold", marginRight: "3%", marginBottom: "3%" }}>50%</Text>
          <Progress.Bar progress={0.5} width={200} color="white" />

        </View>
        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>

      </View>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: "85%", borderRadius: "15%", marginTop: "5%" }}>
        {windWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: "15%" }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High wind speeds</Text>
            </View>
          </View>
        )}


        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} source={require("../assets/Wind.png")} key="Wind" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Wind</Text>
        </View>

        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>400+ ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>5 knots</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>{getDir(19)} <Image resizeMode={"center"} source={arrows[getDir(19)]} key="dir" /></Text>
        </View>
        <Image width={"100%"} resizeMode={"stretch"} source={require("../assets/Seperator.png")} key="Rainfall" />
        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>0-400 ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>5 knots</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>S <Image resizeMode={"center"} source={arrows["N"]} key="dir" /></Text>
        </View>

        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>
      </View>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: "85%", borderRadius: "15%", marginTop: "5%" }}>
        {turbulenceWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: "15%" }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>Turbulence detected</Text>
            </View>
          </View>
        )}


        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} source={require("../assets/Turbulence.png")} key="Turbulence" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Turbulent Atmospheric Layers</Text>
        </View>
        {renderLayers}

        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>
      </View>
      {
        floodWarning && (
          <View width={"96%"} centerH backgroundColor="#BF414F" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: "15%" }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Alert.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High flood risk</Text>
            </View>
          </View>

        )
      }

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
          <View style={{ flexDirection: "column", marginLeft: "3%", marginRight: "3%" }}>
            <View centerV style={{ marginTop: "3%", marginBottom: "3%", flexDirection: "row", justifyContent: "space-between" }}>
              <Text color="grey" style={{ fontSize: 25, fontWeight: "bold" }}>Distance Units</Text>
              <TouchableOpacity onPress={() => toggleFt()}>
                <View center style={{ flexDirection: "row", justifyContent: "space-between", borderRadius: 20, backgroundColor: "#E6E6E6" }}>
                  {usingFt && (
                    <>
                      <View style={{ marginLeft: "5%", borderRadius: 20, backgroundColor: "#55B1F3", }}>
                        <Text color="white" style={{ fontSize: 20, fontWeight: "bold", ...padding(10, 5, 10, 5) }}>Feet</Text>
                      </View>
                      <Text color="grey" style={{ fontSize: 20, fontWeight: "bold", marginRight: "5%" }}>Meters</Text>
                    </>
                  )}
                  {!usingFt && (
                    <>
                      <Text color="grey" style={{ fontSize: 20, fontWeight: "bold", marginLeft: "5%" }}>Feet</Text>
                      <View style={{ marginRight: "5%", borderRadius: 20, backgroundColor: "#55B1F3", }}>
                        <Text color="white" style={{ fontSize: 20, fontWeight: "bold", ...padding(10, 5, 10, 5) }}>Meters</Text>
                      </View>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <View centerV style={{ marginTop: "3%", marginBottom: "3%", flexDirection: "row", justifyContent: "space-between" }}>
              <Text color="grey" style={{ fontSize: 25, fontWeight: "bold" }}>Speed Units</Text>
              <TouchableOpacity onPress={() => toggleKnots()}>
                <View center style={{ flexDirection: "row", justifyContent: "space-between", borderRadius: 20, backgroundColor: "#E6E6E6" }}>
                  {usingKnots && (
                    <>
                      <View style={{ marginLeft: "5%", borderRadius: 20, backgroundColor: "#55B1F3", }}>
                        <Text color="white" style={{ fontSize: 20, fontWeight: "bold", ...padding(10, 5, 10, 5) }}>Knots</Text>
                      </View>
                      <Text color="grey" style={{ fontSize: 20, fontWeight: "bold", marginRight: "5%" }}>m/s</Text>
                    </>
                  )}
                  {!usingKnots && (
                    <>
                      <Text color="grey" style={{ fontSize: 20, fontWeight: "bold", marginLeft: "5%" }}>Knots</Text>
                      <View style={{ marginRight: "5%", borderRadius: 20, backgroundColor: "#55B1F3", }}>
                        <Text color="white" style={{ fontSize: 20, fontWeight: "bold", ...padding(10, 5, 10, 5) }}>m/s</Text>
                      </View>
                    </>
                  )}
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>}
      </Dialog>
    </View>
  )
}