import React, { useEffect, useState } from 'react';
import {  
	HStack,
	View,
	useTheme,
	Text,
	VStack,
	ScrollView,
	Button,
	useToast,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable, Linking } from 'react-native';
import { ArrowLeft, WhatsappLogo } from 'phosphor-react-native';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { AnnouncementData } from '@components/AnnouncementData';
import { api } from '@services/api';
import { Announcement } from '@dtos/AnnoucementDTO';
import { Load } from '@components/Load';
import { UserDTO } from '@dtos/UserDTO';

interface RouteParams {
	params: {
		announcementId: string;
		userId: string;
	}
}

export function DetailsAnnouncement() {
	const theme = useTheme();
	const toast = useToast();
	const navigator = useNavigation<AuthNavigatorRouteProps>();
	const { params } = useRoute() as RouteParams;

	const [isLoading, setIsLoading] = useState(false);
	const [details, setDetails] = useState<Announcement | null>(null);
	const [userAnnouncementInformation, setUserAnnouncementInformation] = useState<UserDTO>({} as UserDTO)

	async function loadAnnouncementUserInformation(){
		try {
			const res = await api.get(`/users/${params.userId}`);
			setUserAnnouncementInformation(res.data);
		} catch (error) {
			console.error(error);
			toast.show({
				title: 'Erro ao carregar contagem de anúncios ativos',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		}
	}

	async function openWhatsAppChat(){
		if(userAnnouncementInformation.phone) {
			Linking.openURL(`whatsapp://send?phone=${userAnnouncementInformation.phone}&text=${''}`);
		}
	}

	async function loadAnnouncementDetails(){
		try {
			const {data} = await api.get(`/announcements/${params.announcementId}?userId=${params.userId}`);
			setDetails(data.data);
		} catch (error) {
			console.error(error);
			toast.show({
				title: 'Erro ao carregar contagem de anúncios ativos',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		}
	}

	useEffect(() => {
		(async function(){
			setIsLoading(true);
			try {
				Promise.all([loadAnnouncementUserInformation(), loadAnnouncementDetails()])
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return isLoading ? <Load/> : (
		<VStack bgColor={'gray.600'} pt={9} flex={1}>
			<ScrollView  showsVerticalScrollIndicator={false}>
				<VStack pb={8}>
					<View px={6} my={3}>
						<Pressable onPress={() => navigator.goBack()}>
							<ArrowLeft size={24} weight="bold" color={theme.colors.gray[200]} />
						</Pressable>
					</View>

					{details && userAnnouncementInformation.email && (
						<AnnouncementData 
							title={details.title}
							description={details.description}
							isNew={details.is_new}
							isExchangeable={details.is_exchangeable}
							photos={details.images}
							price={details.price}
							paymentMethods={details.payment_methods}
							userName={userAnnouncementInformation.username}
							userPhoto={userAnnouncementInformation.photo}
						/>
					)}
				</VStack>				
			</ScrollView>

			{/* Bottom */}
			<HStack p={6} pb={'30'} bgColor={'gray.700'} alignItems={'center'} justifyContent={'space-between'}>
				<Text color={'blue.500'} fontFamily={'body'} fontSize={24}>
					<Text fontSize={14}>R$ </Text>
					{details?.price}
				</Text>

				<Button bgColor={'blue.400'}>
					<HStack alignItems={'center'} justifyContent={'space-between'} space={2}>
						<WhatsappLogo size={16} weight='fill' color='white'/>
						<Text color='gray.700' fontFamily={'body'} fontSize={14}>Entrar em contato</Text>
					</HStack>
				</Button>
			</HStack>
		</VStack>
	)
}