import React from 'react';
import { VStack, Image, Text, Center, Heading, useTheme, Button, ScrollView, View, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import logo from '@assets/logo.png';
import { Input } from '@components/Input';
import { PublicNavigatorRouteProps } from '@routes/public.routes';
import { useAuth } from '@contexts/AuthProvider';

const schema = z.object({
	email: z.string().email({message: 'E-mail inválido, insira corretamente.'}),
	password: z.string().min(6, {message: 'Senha inválida'})
});

type FormProps = z.infer<typeof schema>;

export function Login(){
	const navigator = useNavigation<PublicNavigatorRouteProps>();
	const { control, handleSubmit, formState: {errors} } = useForm<FormProps>({
		resolver: zodResolver(schema)
	});
	const toast = useToast();
	const {signIn} = useAuth();

	function handleSignUp(){
		navigator.navigate('signUp');
	}

	async function handleSignIn({email, password}: FormProps){
		try {
			await signIn({email, password});
		}catch(e){
			console.error(e);
			toast.show({
				title: 'Erro ao realizar login, tente novamente.',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		}
	}

  return(
		<ScrollView
			bgColor='gray.700'
		>
			<VStack 
				w='full' 
				h='556px' 
				bgColor={'gray.600'} 
				justifyContent={'center'}
				borderBottomRadius={24}
				pt={16}
				pb={16}
			>
				<Center>
					<Image source={logo} resizeMode='cover' alt='logo marketspace' />
					<Center mt={2}>
						<Heading color='gray.100' fontSize='3xl' fontFamily='body'>
							marketspace
						</Heading>
						<Text color='gray.300' fontFamily='heading' fontWeight='thin' fontSize='sm'>Seu espaço de compra e venda</Text>
					</Center>
				</Center>
	
				<Center mt={16} px={12}>
					<Center mb={4}>
						<Text color='gray.200' fontFamily={'heading'} fontSize='md' fontWeight={'normal'}>Acesse sua conta</Text>
						<Text color='red.500' fontFamily={'heading'}>{errors.email || errors.password ? 'E-mail ou Senha inválido.' : ' '}</Text>		
					</Center>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input 
								onChangeText={onChange} 
								onBlur={onBlur}
								placeholder='E-mail' 
								autoCapitalize='none'
								autoCorrect={false}
								value={value}
								mb={4} 
							/>
						)}
						name="email"
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input 
								onChangeText={onChange} 
								onBlur={onBlur}
								placeholder='Senha' 
								hasPassword
								value={value}
								mb={4} 
							/>
						)}
						name="password"
					/>

					<Button 
						w="full"
						p={3} 
						mt={8} 
						bgColor="blue.400"
						borderRadius={6}
						onPress={handleSubmit(handleSignIn)}
					>
						<Text fontSize={'md'} color={'gray.700'} fontFamily={'body'}>Entrar</Text>
					</Button>
				</Center>
			</VStack>

			<Center px={12} mt={16}>
				<Text>Ainda não tem acesso?</Text>
				<Button onPress={handleSignUp} w='full' mt={4} p={3} bgColor="gray.500" borderRadius={6}>
					<Text fontSize={'md'} color={'gray.200'} fontFamily={'body'}>Criar uma conta</Text>
				</Button>
			</Center>
		</ScrollView>
	)
}
