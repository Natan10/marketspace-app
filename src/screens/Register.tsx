import React, { useState } from 'react';
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
	ScrollView,
	View,
	useToast
} from 'native-base';
import { PencilSimpleLine } from 'phosphor-react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';

import logo from '@assets/logo.png';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRouteProps } from '@routes/public.routes';
import { api } from '@services/api';
import { Load } from '@components/Load';
import { SafeAreaView } from 'react-native';

const DEFAULT_IMAGE = 'https://doodleipsum.com/700/avatar?i=d2b2ff85c278d7c56198ac487777f9d5'

const schema = z.object({
	email: z.string({required_error: 'E-mail obrigatório'}).email({message: 'E-mail inválido'}),
	username: z.string({
		required_error: 'Username obrigatório'
	}).min(1, {
		message: 'Insira um username'
	}),
	phone: z.string().optional(),
	password: z.string().min(6, {message: 'Minímo de 6 dígitos'}).max(12),
	confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, 
	{message: 'Senhas não batem', path: ['confirm_password']})

type FormProps = z.infer<typeof schema>;

export function Register(){
	const {control, handleSubmit, formState: {errors}} = useForm<FormProps>({
		resolver: zodResolver(schema)
	});
	const toast = useToast();
	const theme = useTheme();
	const navigator = useNavigation<PublicNavigatorRouteProps>();

	const [userPhoto, setUserPhoto] = useState<string | null>(null);
	const [isLoad, setIsLoad] = useState(false);

	async function selectUserImage(){
		let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
		
		if (result.assets) {
      setUserPhoto(result.assets[0].uri);
    }
	}

	function handleSignIn(){
		navigator.navigate('signIn');
	}

	async function handleCreate(formData: FormProps){
		setIsLoad(true);
		try {	
			let fileName = '';
			if(userPhoto){
				const avatarForm = new FormData();
				const format = userPhoto?.split('.').pop();
				fileName = `${formData.email}.${format}`.toLowerCase()

				avatarForm.append('filename', fileName);
				avatarForm.append('file', {
					uri: userPhoto,
					name: fileName,
					type: `image/${format}`
				} as any);
	
				const res = await api.post('/signup/avatar', avatarForm, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
			}

			const {data} = await api.post<{error: boolean, message: string}>('/signup', {
				username: formData.username.toLowerCase(),
				email: formData.email.toLowerCase(),
				password: formData.password,
				phone: formData.phone ?? '',
				photo: fileName
			});

			if(data.error) {
				throw new Error();
			}

			handleSignIn()
		} catch (error) {
			toast.show({
				title: 'Erro ao criar usuario, tente novamente.',
				backgroundColor: 'red.400',
				placement: 'top'
			});
			console.error(error);
			setIsLoad(false);
		}
	}

  return !isLoad ? (
			<SafeAreaView style={{backgroundColor: theme.colors.gray[700]}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<VStack
						justifyContent={'center'}
						alignItems={'center'}
						px={12}
						flex={1}
						h={'full'}
					>	
						<Center>
							<Image size={60} source={logo} resizeMode='contain' alt='logo marketspace' />
							<Heading color='gray.100' fontSize='3xl' fontFamily='body'>
								Boas vindas!
							</Heading>
							<Text textAlign='center' color='gray.300' fontFamily='heading' fontSize='sm'>
								Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
							</Text>
						</Center>

						<Center mt={8}>
							<Box position='relative'>
								<Image 
									source={{uri: userPhoto || DEFAULT_IMAGE}}
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
									onPress={selectUserImage}
								>
									<PencilSimpleLine size={16} color={theme.colors.gray[700]} />
								</Pressable>
							</Box>
						</Center>
						
						<Stack w='full' direction='column' space={2} mt={8} >
							<Controller 
								control={control}
								render={({field: {onChange, onBlur, value}}) => (
									<View>
										<Text fontFamily={'heading'} color={'red.500'} mb={1}>
											{errors.username && errors.username.message ? errors.username.message:' '}
										</Text>
										<Input placeholder='Nome' onBlur={onBlur} onChangeText={onChange} value={value} />
									</View>
								)}
								name='username'
							/>
							<Controller 
								control={control}
								render={({field: {onChange, onBlur, value}}) => (
									<View>
										<Text fontFamily={'heading'} color={'red.500'} mb={1}>{errors.email && errors.email.message ? errors.email.message: ' '}</Text>
										<Input placeholder='E-mail' onBlur={onBlur} onChangeText={onChange} value={value} />
									</View>
								)}
								name='email'
							/>
							<Controller 
								control={control}
								render={({field: {onChange, onBlur, value}}) => (
									<View>
										<Text fontFamily={'heading'} color={'red.500'} mb={1}>
											{errors.phone && errors.phone.message ? errors.phone.message: ' '}
										</Text>
										<Input placeholder='Telefone' onBlur={onBlur} onChangeText={onChange} value={value} />
									</View>
								)}
								name='phone'
							/>
							<Controller 
								control={control}
								render={({field: {onChange, onBlur, value}}) => (
									<View>
										<Text fontFamily={'heading'} color={'red.500'} mb={1}>
											{errors.password && errors.password.message ? errors.password.message: ' '}
										</Text>
										<Input placeholder='Senha' hasPassword onBlur={onBlur} onChangeText={onChange} value={value} />
									</View>
								)}
								name='password'
							/>
							<Controller 
								control={control}
								render={({field: {onChange, onBlur, value}}) => (
									<View>
										<Text fontFamily={'heading'} color={'red.500'} mb={1}>
											{errors.confirm_password && errors.confirm_password.message ? errors.confirm_password.message: ' '}
										</Text>
										<Input 
											placeholder='Confirmar senha' 
											hasPassword 
											onBlur={onBlur} 
											onChangeText={onChange} 
											value={value} 
										/>
									</View>
								)}
								name='confirm_password'
							/>
							
						</Stack>

						<Center w='full'>
							<Button onPress={handleSubmit(handleCreate)} w='full' mt={6} mb={8} p={3} bgColor="gray.100" borderRadius={6}>
								<Text fontSize={'md'} color={'gray.700'} fontFamily={'body'}>Criar</Text>
							</Button>

							<Text color='gray.200' fontSize='xs' fontFamily={'heading'}>
								Já tem uma conta?
							</Text>

							<Button onPress={handleSignIn} w='full' mt={4} p={3} bgColor="gray.500" borderRadius={6}>
								<Text fontSize={'md'} color={'gray.200'} fontFamily={'body'}>
									Ir para o login
								</Text>
							</Button>
						</Center>
					</VStack>
				</ScrollView>
			</SafeAreaView>
	) : (<Load />)
}