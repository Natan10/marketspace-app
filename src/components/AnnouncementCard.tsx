import React from 'react';
import { VStack, Box, Image, Text, Avatar, Pressable } from 'native-base';

import { AnnouncementCard as Model } from '@dtos/AnnoucementDTO';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouteProps } from '@routes/auth.routes';
import { useAuth } from '@contexts/AuthProvider';
import { getAnnouncementPhotosUrl } from '@helpers/getURIs';

interface Props {
	data: Model;
	announcementUserId: string;
}

const DEFAULT_PHOTO = "https://doodleipsum.com/700/hand-drawn?bg=63C8D9&i=e19d85b3c47d863c9a84aadff101fec7";

export function AnnouncementCard({data, announcementUserId}: Props){
	const { user } = useAuth();
	const {id, title, price, photos, isNew, isEnabled = true} = data;

	const iNewTag = (isNew ? 'Novo':'Usado').toUpperCase();

	const navigator = useNavigation<AuthNavigatorRouteProps>();

	function handleDetailsAnnouncement(){
		if(user?.id === announcementUserId) {
			navigator.navigate('publishAnnouncement', {announcementId: String(id)})
		}else{
			navigator.navigate('detailAnnouncement', {announcementId: String(id), userId: announcementUserId})
		}
	}

	function getPhotos(photos: string[]){
		const uris = photos.filter(photo => photo.match(/(jpg|png)/g));
		if(uris.length) {
			return getAnnouncementPhotosUrl(uris)[0];
		}
		return DEFAULT_PHOTO
	}

	return(
		<VStack mt={4}>
			<Box position={'relative'} w={165} h={120} bgColor={'gray.500'} rounded={6}
			>	
				<Pressable onPress={handleDetailsAnnouncement}>
					<Image 
						source={{
							uri: getPhotos(photos)
						}}
						alt={title}
						opacity={isEnabled ? 100 : 40}
						resizeMode='cover'
						size={'full'}
						rounded={6}
					/>
				</Pressable>
				<Box 
					position={'absolute'} 
					right={1} top={1.5} 
					bgColor={isNew ? 'blue.500':'gray.200'} 
					px={2} py={0.5} 
					rounded={'full'}
					opacity={isEnabled ? 100: 40}
				>
					<Text color={'#fff'} fontFamily={'body'} fontSize={10}>
						{iNewTag}
					</Text>
				</Box>
				{!isEnabled &&(
					<Text position={'absolute'} left={2} bottom={1} color={'gray.700'} bold fontSize={11}>
						{`Anúncio desativado`.toUpperCase()}
					</Text>
				)}
				{/* {photos.length > 0 && (
					<Avatar 
						source={{
							uri: 'https://doodleipsum.com/700/avatar?i=0512365fbc5f44dc6d964e17e6900bb4'
						}}
						size={6}
						position={'absolute'}
						left={1} 
						top={1.5}
						borderWidth={1}
						borderColor={'gray.700'}
					/>
				)} */}
			</Box>
			<Box>
				<Text 
					color={isEnabled ? 'gray.200' : 'gray.400'} 
					fontFamily={'heading'} 
					fontSize={16}
				>
					{title}
				</Text>
				<Text 
					color={isEnabled ? 'gray.100' : 'gray.400'}
					fontFamily={'body'}
					fontSize={18}
				>
					<Text fontSize={12}>R$ </Text>{price.toLocaleString('pt-br', {
						currency: 'brl',
						style: 'currency'
					})}
				</Text>
			</Box>
		</VStack>
	)
}