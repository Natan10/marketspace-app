import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
