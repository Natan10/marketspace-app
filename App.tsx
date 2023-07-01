import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { NativeBaseProvider } from "native-base";
import { Karla_400Regular, Karla_700Bold, useFonts} from '@expo-google-fonts/karla';

import { THEME } from '@theme/.';
import { Routes } from '@routes/index';
import { AuthProvider } from '@contexts/AuthProvider';
import { PreviewProvider } from '@contexts/PreviewProvider';

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
			<AuthProvider>
				<PreviewProvider>
					<StatusBar 
						barStyle={'dark-content'} 
						translucent
						backgroundColor={'transparent'}
						/>
					<Routes/>
				</PreviewProvider>
			</AuthProvider>
    </NativeBaseProvider>
  );
}
