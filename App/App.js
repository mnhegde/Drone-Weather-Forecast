import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Link, NativeRouter, Route, Routes} from 'react-router-native'
import Index from './Pages';
import Settings from './Pages/settings';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>  
        <Routes>
          <Route exact path="/" element={<Index/>}/>
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </View>
    </NativeRouter>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
