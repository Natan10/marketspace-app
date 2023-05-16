import React from 'react';
import { VStack, Image, Text, Center, Heading, useTheme, Button } from 'native-base';
import { Eye } from 'phosphor-react-native';

import logo from '@assets/logo.png';
import { Input } from '@components/Input';

export function Login(){
	const theme = useTheme();

  return(
		<VStack
			bgColor='gray.700'
			flex={1}
		>
			<VStack 
				w='full' 
				h='70%' 
				bgColor={'gray.600'} 
				justifyContent={'center'}
				borderBottomRadius={24}
			>
				<Center>
					<Image source={logo} resizeMode='cover' alt='logo marketspace' />
					<Center mt={2}>
						<Heading color='gray.100' fontSize='3xl' fontFamily='bold'>
							marketspace
						</Heading>
						<Text color='gray.300' fontFamily='heading' fontWeight='thin' fontSize='sm'>Seu espaço de compra e venda</Text>
					</Center>
				</Center>
	
				<Center mt={20} px={12}>
					<Text mb={4} color='gray.200' fontFamily={'heading'} fontSize='md' fontWeight={'normal'}>Acesse sua conta</Text>

					<Input placeholder='E-mail' mb={4} />
					<Input 
						placeholder='Senha' 
						hasPassword
					/>

					<Button w="full" p={3} mt={8} bgColor="blue.400" borderRadius={6}>
						<Text fontSize={'md'} color={'gray.700'} fontWeight={'bold'} fontFamily={'bold'}>Entrar</Text>
					</Button>
				</Center>
			</VStack>

			<Center px={12} mt={16}>
				<Text>Ainda não tem acesso?</Text>
				<Button w='full' mt={4} p={3} bgColor="gray.500" borderRadius={6}>
					<Text fontSize={'md'} color={'gray.200'} fontWeight={'bold'} fontFamily={'bold'}>Criar uma conta</Text>
				</Button>
			</Center>
		</VStack>
	)
}