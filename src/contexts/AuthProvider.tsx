import React,{createContext, useContext, useState} from 'react';
import jwt_decode from "jwt-decode";
import { Spinner, View } from 'native-base';

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

			setUser({
				id: user_id,
				email: userInformation.email, 
				username: userInformation.username,
				phone: userInformation.phone,
				photo: userInformation.photo
			});			
		} catch (error) {
			throw error;	
		} finally {
			setIsLoading(false);
		}
	}

	function signOut(){
		setUser(null);
		api.defaults.headers.common['Authorization'] = ``;
	}
	// guardar no async storage

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