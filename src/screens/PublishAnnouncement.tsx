import React, { useEffect, useState } from 'react';
import { Button, HStack, Pressable, ScrollView, VStack, Text, useTheme, useToast } from 'native-base';
import { ArrowLeft, PencilSimpleLine, Power, Trash } from 'phosphor-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';

import { AnnouncementData } from '@components/AnnouncementData';
import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { api } from '@services/api';
import { useAuth } from '@contexts/AuthProvider';
import { Announcement } from '@dtos/AnnoucementDTO';
import { LoadRoot } from '@components/Load';
import { HomeNavigatorRouteProps } from '@routes/home.routes';

export function PublishAnnouncement(){
	const navigator = useNavigation<AuthNavigatorRouteProps & HomeNavigatorRouteProps>();
	const theme = useTheme();
	const toast = useToast();
	const { user } = useAuth();
	const {params} = useRoute() as any;

	const [data, setData] = useState<Announcement | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const iconColor = theme.colors.gray[200];
	const bgColor = theme.colors.gray[600];

	function handleEdit(){
		navigator.navigate('newAnnouncement')
	}

	async function loadAnnouncementData(){
		try {
			const {data} = await api.get(`/announcements/${params.announcementId}?userId=${user?.id}`);
			setData(data.data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}
	async function handleUpdateState(){
		setIsLoading(true);
		try {
			if(!data){
				return;
			}
			const payload: Announcement = {
				...data,
				is_active: !data?.is_active
			}	

			await api.put(`/announcements/${params.announcementId}`, {
				...payload
			});

			await loadAnnouncementData();
		} catch (error) {
			console.error(error);
		}
	}

	async function handleDeleteAnnouncement(){
		setIsLoading(true);
		try {
			await api.delete(`/announcements/${params.announcementId}`);
			navigator.navigate('myAnnouncements');
		} catch (error) {
			console.error(error);
			toast.show({
				title: 'Erro ao excluir anúncio',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		loadAnnouncementData();
	},[]);

	return isLoading ? <LoadRoot.Screen /> : (
		<SafeAreaView 
			style={{
				flex: 1, 
				backgroundColor: bgColor,
				paddingVertical: Platform.OS === 'android' ? 25:0
			}}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack pt={6}>
					<HStack px={6} mb={4} alignItems={'center'} justifyContent={'space-between'}>
						<Pressable onPress={() => navigator.goBack()}>
							<ArrowLeft size={24} weight="bold" color={iconColor} />
						</Pressable>

						<Pressable onPress={handleEdit}>
							<PencilSimpleLine size={24} weight="bold" color={iconColor} />
						</Pressable>
					</HStack>
					
					{data && (
						<AnnouncementData 
							title={data.title}
							description={data.description}
							isNew={data.is_new}
							isExchangeable={data.is_exchangeable}
							price={data.price}
							paymentMethods={data.payment_methods}
							photos={data.images}
							isActive={data.is_active}
							userName={user?.username || ''}
							userPhoto={user?.photo || ''}
						/>
					)}

					<VStack px={6} mt={6} space={2}>
						<Button 
							bgColor={!data?.is_active ? 'blue.400':'gray.100'} 
							p={3} 
							rounded={6}
							onPress={handleUpdateState}
						>
							<HStack alignItems={'center'} space={2}>
								<Power size={16} color={theme.colors.gray[600]} />
								<Text fontFamily={'body'} color={'gray.700'}>{!data?.is_active ? 'Reativar' : 'Desativar'} anúncio</Text>
							</HStack>
						</Button>
						<Button onPress={handleDeleteAnnouncement} bgColor={'gray.500'} p={3} rounded={6}>
							<HStack alignItems={'center'} space={2}>
								<Trash size={16} color={theme.colors.gray[300]} />
								<Text fontFamily={'body'} color={'gray.200'}>Excluir anúncio</Text>
							</HStack>
						</Button>
					</VStack>
				</VStack>
			</ScrollView>
		</SafeAreaView>
	)
}