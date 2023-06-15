import React from 'react';
import { Button, HStack, Pressable, ScrollView, VStack, Text, useTheme } from 'native-base';
import { ArrowLeft, PencilSimpleLine, Power, Trash } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';
import { AnnouncementData } from '@components/AnnouncementData';
import { AuthNavigatorRouteProps } from '@routes/auth.routes';

export function PublishAnnouncement(){
	const navigator = useNavigation<AuthNavigatorRouteProps>();
	const theme = useTheme();

	const iconColor = theme.colors.gray[200]
	const bgColor = theme.colors.gray[600]

	const isDisabled = false;

	function handleEdit(){
		navigator.navigate('newAnnouncement')
	}

	return(
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

					<AnnouncementData />

					<VStack px={6} mt={6} space={2}>
						<Button 
							bgColor={ isDisabled ? 'blue.400':'gray.100'} 
							p={3} 
							rounded={6}
						>
							<HStack alignItems={'center'} space={2}>
								<Power size={16} color={theme.colors.gray[600]} />
								<Text fontFamily={'body'} color={'gray.700'}>{isDisabled ? 'Reativar' : 'Desativar'} anúncio</Text>
							</HStack>
						</Button>
						<Button bgColor={'gray.500'} p={3} rounded={6}>
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