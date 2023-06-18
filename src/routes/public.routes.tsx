import React from 'react';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '@screens/Login';
import { Register } from '@screens/Register';

type PublicRouteParams = {
	signIn: undefined;
	signUp: undefined;
} 

const {Navigator, Screen} = createNativeStackNavigator<PublicRouteParams>();

export type PublicNavigatorRouteProps = NativeStackNavigationProp<PublicRouteParams>;

export function PublicRoutes(){
	return(
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen 
				name='signIn'
				component={Login}
			/>

			<Screen 
				name='signUp'
				component={Register}
			/>
		</Navigator>
	)
}