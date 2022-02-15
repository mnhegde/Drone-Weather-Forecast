import 'react-native-gesture-handler'
import React from 'react';
import { Image, View } from 'react-native-ui-lib'
import {NativeRouter, Route, Routes} from 'react-router-native'
import Index from './Pages/Index';
import Data from "./Pages/Data";
export default function App() {
  return (
    <NativeRouter>
      <View flex center style={{backgroundColor:"white"}}> 
        <Routes>
          <Route exact path="/" element={<Index/>}/>
          <Route exact path='/data' element={<Data />}/>
        </Routes>
      </View> 
    </NativeRouter>
    
  );
};
