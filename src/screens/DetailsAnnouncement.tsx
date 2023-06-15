import React from 'react';
import {  
	HStack,
	View,
	useTheme,
	Text,
	VStack,
	ScrollView,
	Button
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { ArrowLeft, WhatsappLogo } from 'phosphor-react-native';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { AnnouncementData } from '@components/AnnouncementData';

export function DetailsAnnouncement() {
	const theme = useTheme();

	const navigator = useNavigation<AuthNavigatorRouteProps>();

	return(
		<VStack bgColor={'gray.600'} pt={9} flex={1}>
			<ScrollView  showsVerticalScrollIndicator={false}>
				<VStack pb={8}>
					<View px={6} my={3}>
						<Pressable onPress={() => navigator.goBack()}>
							<ArrowLeft size={24} weight="bold" color={theme.colors.gray[200]} />
						</Pressable>
					</View>

					<AnnouncementData />
				</VStack>				
			</ScrollView>

			{/* Bottom */}
			<HStack p={6} pb={'30'} bgColor={'gray.700'} alignItems={'center'} justifyContent={'space-between'}>
				<Text color={'blue.500'} fontFamily={'body'} fontSize={24}>
					<Text fontSize={14}>R$ </Text>
					120,00
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