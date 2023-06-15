import React from 'react';
import { StatusBar } from 'react-native';
import { HStack, ScrollView, VStack, Text, View, Button, Center, useTheme } from 'native-base';
import { ArrowLeft, Tag } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { AnnouncementData } from '@components/AnnouncementData';

export function PreviewAnnouncement(){
	const theme = useTheme();
	const navigator = useNavigation<AuthNavigatorRouteProps>();

	return(
		<VStack bgColor={'gray.600'} flex={1}>
			<StatusBar barStyle={'light-content'} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Center px={6} pb={8} pt={16} bgColor={'blue.400'} w={'full'}>
					<Text color={'gray.700'} fontFamily={'body'} fontSize={16}>Pré visualização do anúncio</Text>
					<Text color={'gray.700'} fontFamily={'heading'} fontSize={14}>É assim que seu produto vai aparecer!</Text>
				</Center>

				<View pb={6}>
					<AnnouncementData />			
				</View>
			</ScrollView>

			{/* Bottom */}
			<HStack p={6} pb={'30'} space={4} bgColor={'gray.700'} alignItems={'center'} justifyContent={'space-between'}>
				<Button onPress={() => navigator.goBack()} flex={1} rounded={6} bgColor={'gray.500'}>
					<HStack alignItems={'center'} space={2}>
						<ArrowLeft size={16} weight="thin" />
						<Text fontSize={14} color={'gray.200'}>
							Voltar e editar
						</Text>
					</HStack>
				</Button>
				<Button flex={1} rounded={6} bgColor={'blue.400'}>
					<HStack alignItems={'center'} space={2}>
						<Tag size={16} weight="thin" color={theme.colors.gray[700]} />
						<Text fontSize={14} color={'gray.700'}>
							Publicar
						</Text>
					</HStack>
				</Button>
			</HStack>
		</VStack>
	)
}