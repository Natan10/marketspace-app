import React,{createContext, useContext, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import { Spinner, View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '@services/api';

interface User {
	id: string;
	username: string;
	email: string;
	phone: string;
	photo: string;
}

type SignInParams = {email: string; password: string};

interface AuthContextProps {
	user: User | null
	signIn: (data: SignInParams) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


interface AuthProviderProps {
	children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps){
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function signIn({email, password}: SignInParams) {
		setIsLoading(true);
		try {
			const {data} = await api.post("/signin", {
				email,
				password
			});

			const {token} = data;
			const {sub: user_id} = jwt_decode(token) as any;

			api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			const {data: userInformation} = await api.get(`/users/${user_id}`);

			const payload = {
				id: user_id,
				email: userInformation.email, 
				username: userInformation.username,
				phone: userInformation.phone,
				photo: userInformation.photo
			}

			setUser(payload);
			await AsyncStorage.setItem('@user', JSON.stringify(payload));
			await AsyncStorage.setItem('@token', JSON.stringify(token));
		} catch (error) {
			throw error;	
		} finally {
			setIsLoading(false);
		}
	}

	async function signOut(){
		await AsyncStorage.removeItem('@user');
		await AsyncStorage.removeItem('@token');
		api.defaults.headers.common['Authorization'] = ``;
		setUser(null);
	}

	useEffect(() => {
		(async function(){
			const user = await AsyncStorage.getItem('@user');
			const token = await AsyncStorage.getItem('@token');
			
			if(user && token) {
				api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
				const payload = JSON.parse(user);
				setUser({...payload});
			}
		})();
	}, []);

	return(
		<AuthContext.Provider value={{
			user,
			signIn,
			signOut
		}}>
			{isLoading ? (
				<View 
					flex={1}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Spinner color="blue.400" size='lg' />
				</View>
			): (
				children
			)}
		</AuthContext.Provider>
	)
}

export function useAuth(){
	return useContext(AuthContext)
}