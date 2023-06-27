import React, { useEffect, useState } from 'react';
import { 
	HStack,
	VStack,
	Box,
	Image,
	Text,
 	useTheme,
	Button,
	Pressable,
	Center,
	Heading,
	Switch,
	Checkbox, 
	View,
	useToast
} from 'native-base';
import { Modal, Platform, SafeAreaView } from 'react-native';
import { ArrowRight, Plus, Tag, X } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { SearchInput } from '@components/SearchInput';
import { SelectButton } from '@components/SelectButton';
import { AnnouncementContainer } from '@components/AnnouncementContainer';
import { useAuth } from '@contexts/AuthProvider';
import { Announcement } from '@dtos/AnnoucementDTO';

import { api, staticURI } from '@services/api';

import { HomeNavigatorRouteProps } from '@routes/home.routes';
import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { Load } from '@components/Load';

export function Home(){
	const [isVisibleFilter, setIsVisibleFilter] = useState(false);
	const theme = useTheme();
	const toast = useToast();
	const { user } = useAuth();

	const [isLoadingData, setIsLoadingData] = useState(false);
	const [announcements, setAnnouncements] = useState<Announcement[]>([]);
	const [myActiveAnnouncements, setMyActiveAnnouncements] = useState(0);

	const navigator = useNavigation<AuthNavigatorRouteProps & HomeNavigatorRouteProps>();

	function handleCreateNewAnnouncement(){
		navigator.navigate('newAnnouncement')
	}

	function handleMyAnnouncements(){
		navigator.navigate('myAnnouncements');
	}

	async function myActiveAnnouncementsCount() {
		try {
			const userId = user?.id;
			const {data} = await api.get(`/announcements?userId=${userId}`) as any;
			const count = data.data.reduce((v: number, a: Announcement) => {
				if(a.is_active) {
					return v++;
				}
			},0);
			setMyActiveAnnouncements(count);
		} catch (error) {
			console.error(error);
			toast.show({
				title: 'Erro ao carregar contagem de anúncios ativos',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		}
	}

	async function loadAnnouncements(){
		try {
			const { data } = await api.get('/announcements');
			setAnnouncements(data.data);
		} catch (error) {
			console.error(error);
			toast.show({
				title: 'Erro ao carregar anúncios',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		}
	}
	
	useEffect(() => {
		(async function(){
			setIsLoadingData(true);
			try {
				Promise.allSettled([loadAnnouncements(), myActiveAnnouncementsCount()])		
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoadingData(false);
			}
		})();
	}, []);

	return isLoadingData ? <Load/> : (
		<SafeAreaView 
			style={{
				flex: 1, 
				backgroundColor: theme.colors.gray[600],
				paddingVertical: Platform.OS === 'android' ? 25:0,
			}}
		>
			<VStack flex={1} px={6}>
				
				{/* Header */}
				<HStack mt={5} justifyContent={'space-between'}>
					<HStack space={3} alignItems={'center'}>
						<Image 
							source={{
								uri: user && user.photo ? `${staticURI}/photos/${user.photo}` : 'https://doodleipsum.com/700/avatar?i=a69d4814c4fc0154cc80b9d158fe6b1f'
							}}
							alt='avatar'
							resizeMode='cover'
							size={50}
							rounded={'full'}
							borderWidth={1}
							borderColor={'blue.400'}
						/>

						<Text fontSize={16} fontFamily={'heading'}>
							Boas vindas,{'\n'}
							<Text fontFamily={'body'}>{user?.username}!</Text>
						</Text>
					</HStack>

					<Button bgColor={'gray.100'} onPress={handleCreateNewAnnouncement} rounded={6}>
						<HStack alignItems={'center'} space={2}>
							<Plus size={16} color={theme.colors.gray[700]} />
							<Text fontFamily={'body'} fontSize={'md'} color='gray.700'>Cria anúncio</Text>
						</HStack>
					</Button>
				</HStack>
				
				{/* Card */}
				<Box mt={8}>
					<Text color={'gray.300'} fontSize={'sm'} fontFamily={'heading'}>
						Seus produtos anunciados para venda 
					</Text>
					{/* Card */}
					<HStack
						p={4}
						mt={3} 
						w={'full'}
						rounded={6} 
						bgColor={'blue.400:alpha.20'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						{/* Icon */}
						<HStack alignItems={'center'} space={4}>
							<Tag size={20} color={'rgba(54, 77, 157, 1)'} />
							<VStack>
								<Text color={'gray.200'} fontFamily={'body'} fontSize={'lg'}>{myActiveAnnouncements}</Text>
								<Text color={'gray.200'} fontFamily={'heading'} fontSize={'xs'}>anúncios ativos</Text>
							</VStack>
						</HStack>

						<Pressable onPress={handleMyAnnouncements}>
							<HStack alignItems={'center'} space={2}>
								<Text fontFamily={'body'} fontSize={14} color={'blue.500'}>Meus anúncios</Text>
								<ArrowRight size={16} color={theme.colors.blue[500]} />
							</HStack>
						</Pressable>
					</HStack>
				</Box>

				{/* Search Field */}
				<Box mt={8}>
					<Text color={'gray.300'} fontSize={'sm'} fontFamily={'heading'}>
						Compre produtos variados 
					</Text>

					<SearchInput 
						mt={3}
						placeholder='Buscar anúncio'
						onSearch={() => console.log('search')}
						onFilters={() => setIsVisibleFilter(true)}
					/>
				</Box>

				{/* announcement cards */}
				<Box flex={1} pb={2} mt={6}>
					<AnnouncementContainer data={announcements}/>
				</Box>
				
				{/* TODO - melhorar isso, fazendo scroll com o react-gesture-handler */}
				<Modal
					visible={isVisibleFilter}
					animationType='slide'
					transparent
				>
					<VStack flex={1} bgColor={'gray.300:alpha.30'}>
						<VStack px={6} pb={8} pt={3} roundedTop={24} mt={'auto'} h={'630'} w={'full'} bgColor={'gray.700'}>
							<Center>
								<Box w={'54'} h={1} bgColor={'gray.400:alpha.40'}></Box>
							</Center>

							<VStack mt={8}>
								<HStack mb={6} alignItems={'center'} justifyContent={'space-between'}>
									<Heading color={'gray.100'} bold fontSize={22}>Filtrar anúncios</Heading>
									<Pressable onPress={() => setIsVisibleFilter(old => !old)}>
										<X size={24} color={theme.colors.gray[400]} />
									</Pressable>
								</HStack>
								
								<View mb={4}>
									<Text color={'gray.200'} fontSize={14} bold>Condição</Text>
									<HStack alignItems={'center'} space={3} mt={3}>
										<SelectButton isSelected title='novo' />
										<SelectButton title='usado' />
									</HStack>
								</View>

								<HStack mb={4} alignItems={'center'} space={2}>
									<Text color={'gray.200'} fontSize={14} bold>Aceita troca?</Text>
									<Switch 
										size="sm"
										onTrackColor="blue.400" 
									/>
								</HStack>

								<View>
									<Text color={'gray.200'} fontSize={14} bold>
										Meios de pagamento aceitos
									</Text>

									<Checkbox.Group mt={3}>
										<Checkbox borderWidth={1} mb={2} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Boleto
										</Checkbox>
										<Checkbox borderWidth={1} mb={2} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Pix
										</Checkbox>
										<Checkbox borderWidth={1} mb={2} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Dinheiro
										</Checkbox>
										<Checkbox borderWidth={1} mb={2} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Cartão de Crédito
										</Checkbox>
										<Checkbox borderWidth={1} mb={2} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Cartão de Débito
										</Checkbox>
										<Checkbox borderWidth={1} 
											_checked={{
											bgColor: 'blue.400',
											borderColor: 'blue.400'
										}} 
										_text={{
											fontSize: 16,
											color: 'gray.200',
											fontFamily: 'heading',
										}}
										value='Teste'>
											Depósito Bancário
										</Checkbox>

									</Checkbox.Group>
								</View>
							</VStack>

							<HStack mt={"auto"} space={3}>
								<Button bgColor={'gray.500'} rounded={6} flex={1}>
									<Text color="gray.200" fontSize={14} bold>Resetar Filtros</Text>
								</Button>
								<Button flex={1} bgColor={'gray.200'} rounded={6}>
									<Text color="gray.700" bold fontSize={14}>Aplicar Filtros</Text>
								</Button>
							</HStack>
						</VStack>
					</VStack>
				</Modal>
			</VStack>
		</SafeAreaView>
	)
}