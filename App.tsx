import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Karla_400Regular, Karla_700Bold, useFonts} from '@expo-google-fonts/karla';

import { THEME } from '@theme/.';
import {Login} from '@screens/Login';

export default function App() {
	const [fontsLoaded] = useFonts({
		Karla_400Regular,
		Karla_700Bold
	});

	if(!fontsLoaded){
		return <ActivityIndicator size='large' color='purple'/>
	}

  return (
    <NativeBaseProvider theme={THEME}>
      <Login/>
    </NativeBaseProvider>
  );
}
