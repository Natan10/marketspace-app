import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { HStack, ScrollView, VStack, Text, View, Center, useTheme } from 'native-base';
import { ArrowLeft, Tag } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { AnnouncementData } from '@components/AnnouncementData';
import { usePreviewContext } from '@contexts/PreviewProvider';
import { Button as ButtonComposition } from '@components/Button';
import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO';
import { useAuth } from '@contexts/AuthProvider';
import { staticURI } from '@services/api';

const paymentMethodsMapper: PaymentMethodsDTO = {
	pix: false,
	bank_deposit: false,
	boleto: false,
	cash: false,
	credit_card: false
} 

export function PreviewAnnouncement(){
	const theme = useTheme();
	const navigator = useNavigation<AuthNavigatorRouteProps>();
	const { user } = useAuth();
	const { previewData } = usePreviewContext();

	const labels: PaymentMethodsDTO = Object.keys(paymentMethodsMapper).reduce((p: any,v: any) => {
		if(previewData.paymentMethods.includes(v)){
			p[v] = true;
		}
		return p;
	}, paymentMethodsMapper);

	const userPhoto = user ? `${staticURI}/photos/${user.photo}` : ''

	return(
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
					<AnnouncementData 
						description={previewData.description}
						title={previewData.title}
						isExchangeable={previewData.isExchangeable}
						isNew={previewData.isNew}
						price={previewData.price}
						photos={previewData.images}
						paymentMethods={labels}
						userName={user?.username || ''}
						userPhoto={userPhoto}
					/>			
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
					onPress={() => navigator.goBack()}
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