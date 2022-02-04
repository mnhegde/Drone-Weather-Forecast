import 'react-native-gesture-handler'
import React from 'react';
import { Image, View } from 'react-native-ui-lib'
import {NativeRouter, Route, Routes} from 'react-router-native'
import Index from './Pages/Index';

export default function App() {
  return (
    <NativeRouter>
      <View flex center style={{backgroundColor:"black"}}> 
      
        <Routes>
          <Route exact path="/" element={<Index/>}/>
        </Routes>
        
      </View> 
    </NativeRouter>
    
  );
};
