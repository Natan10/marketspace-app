import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Karla_400Regular, Karla_700Bold, useFonts} from '@expo-google-fonts/karla';

import { THEME } from '@theme/.';

import { Register } from '@screens/Register';

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
      <Register/>
    </NativeBaseProvider>
  );
}
