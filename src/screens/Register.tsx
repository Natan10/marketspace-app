import React from 'react';
import { 
	VStack,
	Image,
	Text,
	Center,
	Heading,
	useTheme,
	Button,
	Box,
	Pressable,
	Stack,
	ScrollView
} from 'native-base';
import { PencilSimpleLine } from 'phosphor-react-native';

import logo from '@assets/logo.png';
import { Input } from '@components/Input';

export function Register(){
	const theme = useTheme();

  return(
			<ScrollView bgColor={'gray.700'} pt={12}>
				<VStack
					justifyContent={'center'}
					alignItems={'center'}
					px={12}
					flex={1}
					h={'full'}
				>	
					<Center>
						<Image size={60} source={logo} resizeMode='contain' alt='logo marketspace' />
						<Heading color='gray.100' fontSize='3xl' fontFamily='bold'>
							Boas vindas!
						</Heading>
						<Text textAlign='center' color='gray.300' fontFamily='heading' fontWeight='thin' fontSize='sm'>
							Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
						</Text>
					</Center>

					<Center mt={8}>
						<Box position='relative'>
							<Image 
								source={{uri: 'https://doodleipsum.com/700/avatar?i=d2b2ff85c278d7c56198ac487777f9d5'}}
								size={90}
								resizeMode='contain'
								borderRadius={100}
								borderColor={'blue.400'}
								borderWidth={3}
								alt='imagem do usuario'
							/>
							<Pressable 
								bgColor={'blue.400'} 
								p={3} 
								justifyContent={'center'} 
								alignItems={'center'}
								borderRadius={100}
								position='absolute'
								bottom={-12}
								right={-10}
							>
								<PencilSimpleLine size={16} color={theme.colors.gray[700]} />
							</Pressable>
						</Box>
					</Center>

					
						<Stack w='full' direction='column' space={4} mt={8} >
							<Input placeholder='Nome'/>
							<Input placeholder='E-mail'/>
							<Input placeholder='Telefone'/>
							<Input placeholder='Senha' hasPassword/>
							<Input placeholder='Confirmar senha' hasPassword/>
						</Stack>

						<Center w='full'>
							<Button w='full' mt={6} mb={8} p={3} bgColor="gray.100" borderRadius={6}>
								<Text fontSize={'md'} color={'gray.700'} fontWeight={'bold'} fontFamily={'bold'}>Criar</Text>
							</Button>

							<Text color='gray.200' fontSize='xs' fontFamily={'heading'}>
								Já tem uma conta?
							</Text>

							<Button w='full' mt={4} p={3} bgColor="gray.500" borderRadius={6}>
								<Text fontSize={'md'} color={'gray.200'} fontWeight={'bold'} fontFamily={'bold'}>
									Ir para o login
								</Text>
							</Button>
						</Center>
				</VStack>
			</ScrollView>
	)
}