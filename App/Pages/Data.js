import React, { useState, useEffect } from 'react'
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';
import { Image, Dialog, PanningProvider } from 'react-native-ui-lib';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Data() {
  const [search, setSearch] = useState(false)
  const [settings, setSettings] = useState(false)
  const [layerData, setLayerData] = useState(["Loading..."])
  const [countriesJSX, setCountriesJSX] = useState()
  const [rainWarning, setRainWarning] = useState(false)
  const [windWarning, setWindWarning] = useState(false)
  const [turbulenceWarning, setTurbulenceWarning] = useState(false)
  const [floodWarning, setFloodWarning] = useState(false)
  const [usingFt, setUsingFt] = useState(true)
  const [usingKnots, setUsingKnots] = useState(true)
  const [chanceOfRain, setChanceOfRain] = useState("Loading...")
  const [progressBar, setProgressBar] = useState()
  const [windData, setWindData] = useState({speedAbove: "Loading...", directionAbove: "Loading...", speedGround: "Loading...", directionGround: "Loading..."})
  const [city, setCity] = useState()

  async function updateCity(c){
    setCity(c)
    await fetch(`http://20.90.82.229:5000/forecast?location=${city}`)
  .then(response =>response.json())
  .then(json => {
    let data = json["forecast_data"]
      setChanceOfRain(data["precipitation"]["chance_of_rain"])
      setProgressBar(<Progress.Bar progress={data["precipitation"]["chance_of_rain"]/100} width={200} color="#8FD9FF" />)
      setWindData({speedAbove: data["aviation"]["above_400ft_wind"]["speed_ms"], directionAbove: data["aviation"]["above_400ft_wind"]["direction_degrees"], speedGround: data["aviation"]["ground_400ft_wind"]["speed_ms"], directionGround: data["aviation"]["ground_400ft_wind"]["direction_degrees"]})
      setLayerData(data["aviation"]["above_400ft_wind"]["turbulent_levels_feet"])
      
      //check for warnings
      if(data["precipitation"]["warnings"] != "None") setRainWarning(true)
      else setRainWarning(false)
      if (data["agriculture"]["warnings"] != "None") setFloodWarning(true)
      else setFloodWarning(false)
  }).catch(e => console.log(e))
  setSearch(false)

  }
  const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    }
  });
  useEffect(async() => {
    
      let c =  await AsyncStorage.getItem("city")
      setCity(c)
      await fetch(`http://20.90.82.229:5000/forecast?location=${city}`)
    .then(response =>response.json())
    .then(json => {
      let data = json["forecast_data"]
      setChanceOfRain(data["precipitation"]["chance_of_rain"])
      setProgressBar(<Progress.Bar progress={data["precipitation"]["chance_of_rain"]/100} width={200} color="#8FD9FF" />)
      setWindData({speedAbove: data["aviation"]["above_400ft_wind"]["speed_ms"], directionAbove: data["aviation"]["above_400ft_wind"]["direction_degrees"], speedGround: data["aviation"]["ground_400ft_wind"]["speed_ms"], directionGround: data["aviation"]["ground_400ft_wind"]["direction_degrees"]})
      setLayerData(data["aviation"]["above_400ft_wind"]["turbulent_levels_feet"])
      
      //check for warnings
      if(data["precipitation"]["warnings"] != "None") setRainWarning(true)
      else setRainWarning(false)
      if (data["agriculture"]["warnings"] != "None") setFloodWarning(true)
      else setFloodWarning(false)
      
      /* define conditions for these warnings
      setWindWarning(true);
      setTurbulenceWarning(true);
      */
      
      /* for scrolling  
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}> 
      for everything except footer
      automaticallyAdjustContentInsets={false}
      */
    })
    fetch("http://20.90.82.229:5000/cities")
    .then(response => response.json())
    .then(json => {
      let renderCountries = json["city_domains"].map((data, i) => {
        return (<TouchableOpacity onPress={()=>updateCity(data)} key={i} ><Text color="grey" style={{ fontSize: 25, fontWeight: "bold", marginLeft: "3%" }}>{data}</Text></TouchableOpacity>)
      })
      setCountriesJSX(renderCountries)
    }).catch(e => console.log(e))

  }, [])

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
    "N": require("../assets/compassArrows/N.png"),
    "NNE": require("../assets/compassArrows/NNE.png"),
    "NE": require("../assets/compassArrows/NE.png"),
    "ENE": require("../assets/compassArrows/ENE.png"),
    "E": require("../assets/compassArrows/E.png"),
    "ESE": require("../assets/compassArrows/ESE.png"),
    "SE": require("../assets/compassArrows/SE.png"),
    "SSE": require("../assets/compassArrows/SSE.png"),
    "S": require("../assets/compassArrows/S.png"),
    "SSW": require("../assets/compassArrows/SSW.png"),
    "SW": require("../assets/compassArrows/SW.png"),
    "WSW": require("../assets/compassArrows/WSW.png"),
    "W": require("../assets/compassArrows/W.png"),
    "WNW": require("../assets/compassArrows/WNW.png"),
    "NW": require("../assets/compassArrows/NW.png"),
    "NNW": require("../assets/compassArrows/NNW.png"),
  }

  let renderLayers = layerData.map((data, i) => {
    data = typeof data == "number" ? data + " ft" : data;
    return (<View key={i} centerH style={{ flexDirection: "column", marginTop: "2%" }}>
      <Text onPress={null/*NEED A FUNCTION HERE TO UPDATE DATA */} center color='white' style={{ fontSize: 20, borderColor: "#8FD9FF", borderWidth: 2, borderRadius: 9, ...padding(10, 25, 10, 25), width: "35%" }}>{data}</Text>
    </View>)
  })

  return (
    <View flex centerH width={"100%"} height="100%">
      <View style={{ position: "absolute" }} width={"100%"} height={"100%"} >
        <Image style={{ width: "100%", height: "100%" }} resizeMode={"stretch"} source={require("../assets/BackgroundData.png")} key="Background" />
      </View>
      <Text color="white" center style={{ fontSize: 30, fontWeight: "bold", marginTop: "10%", marginBottom: "10%" }}>DroneScout</Text>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ flexDirection: "column", opacity: .85, borderRadius: 15 }}>
        {rainWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: 15 }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High chance of rain</Text>
            </View>
          </View>
        )}

        <View center style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View centerH centerV style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image resizeMode={"center"} style={styles.tinyLogo} source={require("../assets/Rainfall.png")} key="Rainfall" />
            <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Chance of Rain</Text>
          </View>

        </View>
        <View center style={{ flexDirection: "column", justifyContent: "space-between", marginBottom: "3%" }}>
          <Text color="white" center style={{ fontSize: 20, fontWeight: "bold", marginRight: "3%", marginBottom: "3%" }}>{chanceOfRain + "%"}</Text>
          {progressBar}

        </View>
        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>

      </View>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: .85, borderRadius: 15, marginTop: "5%" }}>
        {windWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: 15 }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High wind speeds</Text>
            </View>
          </View>
        )}


        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} style={styles.tinyLogo} source={require("../assets/Wind1.png")} key="Wind" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Wind</Text>
        </View>

        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>400+ ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>{windData.speedAbove + " m/s"}</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>{getDir(windData.directionAbove)} <Image resizeMode={"center"} source={arrows[getDir(windData.directionAbove)]} key="dir" /></Text>
        </View>
        <Image width={"100%"} resizeMode={"stretch"} source={require("../assets/Seperator.png")} key="Rainfall" />
        <View center style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "3%" }}>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>0-400 ft</Text>
          <Text color="white" style={{ fontSize: 20, marginLeft: "3%" }}>{windData.speedGround + " m/s"}</Text>
          <Text color="white" style={{ fontSize: 20, marginRight: "3%" }}>{getDir(windData.directionGround)} <Image resizeMode={"center"} source={arrows[getDir(windData.directionGround)]} key="dir" /></Text>
        </View>

        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>
      </View>
      <View width={"95%"} backgroundColor="#5D94B0" style={{ opacity: .85, borderRadius: 15, marginTop: "5%" }}>
        {turbulenceWarning && (
          <View width={"96%"} centerH backgroundColor="#DB9706" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: 15 }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Warning.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>Turbulence detected</Text>
            </View>
          </View>
        )}


        <View centerH style={{ flexDirection: "row" }}>
          <Image resizeMode={"center"} style={styles.tinyLogo} source={require("../assets/Turbulence1.png")} key="Turbulence" />
          <Text color="white" center style={{ fontSize: 25, fontWeight: "bold" }}>Turbulent Atmospheric Layers</Text>
        </View>
        {renderLayers}

        <Text color="white" style={{ fontSize: 10, marginLeft: "3%", marginTop: "3%", marginBottom: "3%" }}>Source: Kanda Weather</Text>
      </View>
      {
        floodWarning && (
          <View width={"96%"} centerH backgroundColor="#BF414F" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", marginBottom: "2%", flexDirection: "row", borderRadius: 15 }}>
            <View centerH style={{ marginTop: "2%", marginBottom: "2%", flexDirection: "row" }}>
              <Image source={require("../assets/Alert.png")} style={{ marginLeft: "4%", marginRight: "4%" }} resizeMethod="scale" key="warning" />
              <Text color="white" center style={{ fontSize: 20, fontWeight: "bold" }}>High flood risk</Text>
            </View>
          </View>
        )
      }

      <View width={"100%"} centerV backgroundColor="white" style={{ marginTop: "auto", borderRadius: 15 }} height={"10%"} >
        <View style={{ justifyContent: "space-between", flexDirection: "row", }} >
          <Text color="grey" style={{ fontSize: 35, fontWeight: "bold", marginLeft: "3%" }}>{city}</Text>
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
        {<View width={"100%"} backgroundColor="white" style={{ borderRadius: 15 }}>
          <View centerH style={{ flexDirection: "row", marginLeft: "3%", marginRight: "3%", borderBottomWidth: 2, borderBottomColor: "#E6E6E6", borderBottomRadius: "5%" }}>
            <Image resizeMode={"stretch"} source={require("../assets/Search.png")} key="Search" />
            <Text color="grey" style={{ fontSize: 35, fontWeight: "bold", marginLeft: "3%" }}>Location Select</Text>
          </View>
          {countriesJSX}
        </View>}
      </Dialog>

      <Dialog visible={settings} onDismiss={() => setSettings(false)} panDirection={PanningProvider.Directions.DOWN}>
        {<View width={"100%"} backgroundColor="white" style={{ borderRadius: 15 }}>
          <View centerH style={{ flexDirection: "row", marginLeft: "3%", marginRight: "3%", borderBottomWidth: 2, borderBottomColor: "#E6E6E6", borderBottomRadius: "5%" }}>
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