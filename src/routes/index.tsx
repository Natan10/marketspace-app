import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from "./public.routes";
import { useAuth } from "@contexts/AuthProvider";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
	const {user} = useAuth();

	return(
		<NavigationContainer>
			{user ? <AuthRoutes /> : <PublicRoutes />}
		</NavigationContainer>
	)
}