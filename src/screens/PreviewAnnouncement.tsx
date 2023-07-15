import React, { useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { HStack, ScrollView, VStack, Text, View, Center, useTheme, useToast } from 'native-base';
import { ArrowLeft, Tag } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { Button as ButtonComposition } from '@components/Button';
import { LoadRoot } from '@components/Load';
import { usePreviewContext } from '@contexts/PreviewProvider';
import { useAuth } from '@contexts/AuthProvider';
import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO';
import { api } from '@services/api';
import { AnnouncementComponent } from '@components/AnnouncementInfo';
import { getAvatarUrl } from '@helpers/getURIs';

const paymentMethodsMapper: PaymentMethodsDTO = {
	pix: false,
	bank_deposit: false,
	boleto: false,
	cash: false,
	credit_card: false
} 

const DEFAULT_AVATAR = 'https://doodleipsum.com/700/avatar?i=15386952c2b850ce51ed8166590f17d1';

export function PreviewAnnouncement(){
	const theme = useTheme();
	const toast = useToast();
	const navigator = useNavigation<AuthNavigatorRouteProps>();
	const { user } = useAuth();
	const { previewData } = usePreviewContext();

	const [isLoading, setIsLoading] = useState(false);

	const labels: PaymentMethodsDTO = Object.keys(paymentMethodsMapper).reduce((p: any,v: any) => {
		if(previewData.paymentMethods.includes(v)){
			p[v] = true;
		}
		return p;
	}, paymentMethodsMapper);

	async function handleCreate(){
		setIsLoading(true);
		const announcementEditedId = previewData.announcementId;
		try {
			const { images } = previewData;
			const fileNames: string[] = [];
			
			if(images.length > 0) {
				const form = new FormData();
				images.forEach(photo => {
					const id = v4();
					const format = photo.split('.').pop();
					const fileName = `${id}.${format}`.toLowerCase();
					form.append('images', {
						uri: photo,
						name: fileName,
						type: `image/${format}`
					} as any);
					fileNames.push(fileName);
				});

				await api.post('/announcements/upload',form, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
			} 

			const payload = {
				title: previewData.title,
				description: previewData.description,
				is_new: previewData.isNew,
				price: previewData.price,
				is_exchangeable: previewData.isExchangeable,
				is_active: true,
				images : fileNames,
				user_id: Number(user!.id),
				paymentMethods: labels, 
			}

			if(announcementEditedId) {
				await api.put(`/announcements/${announcementEditedId}`, {
					...payload,
				});
			}else {
				await api.post('/announcements', {
					...payload
				});
			}

			toast.show({
				title: announcementEditedId ? 'Anúncio atualizado com sucesso' : 'Anúncio criado com sucesso',
				backgroundColor: 'green.400',
				placement: 'top'
			});

			navigator.navigate('homeRoutes');
		} catch (error) {
			console.error(error);
			toast.show({
				title: announcementEditedId ? 'Erro ao atualizar anúncio' : 'Erro ao criar anúncio, tente novamente.',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		} finally {
			setIsLoading(false);
		}
	}

	return isLoading ? <LoadRoot.Screen /> : (
		<VStack bgColor={'gray.600'} flex={1}>
			<StatusBar 
				barStyle={'light-content'}
				translucent
				backgroundColor={'transparent'} 
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center px={6} pb={8} pt={16} bgColor={'blue.400'} w={'full'}>
					<Text color={'gray.700'} fontFamily={'body'} fontSize={16}>Pré visualização do anúncio</Text>
					<Text color={'gray.700'} fontFamily={'heading'} fontSize={14}>É assim que seu produto vai aparecer!</Text>
				</Center>

				<View pb={6}>
					<AnnouncementComponent.Root>
						<AnnouncementComponent.Photos 
							photos={
								previewData.images
							}
						/>
						<AnnouncementComponent.Container>
							<AnnouncementComponent.Header 
								isNew={previewData.isNew}
								username={user?.username || ''}
								avatar={user?.photo ? getAvatarUrl(user.photo) : DEFAULT_AVATAR}
							/>
							<AnnouncementComponent.Information 
								title={previewData.title}
								description={previewData.description}
								price={previewData.price}
								isExchangeable={previewData.isExchangeable}
								paymentMethods={labels}
							/>
						</AnnouncementComponent.Container>
					</AnnouncementComponent.Root>		
				</View>
			</ScrollView>

			{/* Bottom */}
			<HStack 
				p={6} 
				pb={Platform.OS === 'ios' ? 9 : 4}
				space={4}
				bgColor={'gray.700'} 
				alignItems={'center'} 
				justifyContent={'space-between'}
			>
				<ButtonComposition.Root
					onPress={() => navigator.goBack()}
					flex={1}
					rounded={6}
					bgColor={'gray.500'}
				>
					<ButtonComposition.Icon 
						icon={<ArrowLeft size={16} weight="thin" />}
					/>
					<ButtonComposition.TitleBold>
						Voltar e Editar
					</ButtonComposition.TitleBold>
				</ButtonComposition.Root>

				<ButtonComposition.Root
					onPress={handleCreate}
					flex={1}
					rounded={6}
					bgColor={'blue.400'}
				>
					<ButtonComposition.Icon 
						icon={<Tag size={16} weight="thin" color={theme.colors.gray[700]} />}
					/>
					<ButtonComposition.TitleBold color={'gray.700'}>
						Publicar
					</ButtonComposition.TitleBold>
				</ButtonComposition.Root>
			</HStack>
		</VStack>
	)
}