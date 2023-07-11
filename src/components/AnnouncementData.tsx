import React from 'react';
import { Avatar, HStack, VStack, Text, Badge, Heading } from 'native-base';

import { ImageSlider } from './ImageSlider';
import { PaymentMethodLabels } from './PaymentMethodLabels';
import { PaymentMethodsDTO } from '@dtos/PaymentMethodsDTO';
import { getAnnouncementPhotosUrl, getAvatarUrl } from '@helpers/getURIs';

interface Props {
	userPhoto: string;
	userName: string;
	isNew: boolean;
	title: string;
	price: number;
	description: string;
	isExchangeable: boolean;
	isActive?: boolean;
	photos: string[];
	paymentMethods: PaymentMethodsDTO;
}

export function AnnouncementData({
	userPhoto, 
	userName, 
	isNew,
	title,
	price,
	description,
	isExchangeable,
	photos,
	paymentMethods,
	isActive = true
}: Props){

	return(
		<VStack>
			<ImageSlider photos={getAnnouncementPhotosUrl(photos)} />
			<VStack px={6}>
				<HStack mt={5} space={2} alignItems={'center'}>
					<Avatar
						source={{
							uri: getAvatarUrl(userPhoto)
						}} 
						_image={{
							resizeMode: 'cover'
						}}
						size={8}
						borderWidth={'2'}
						borderColor={'blue.400'} 
					/>
					<Text color={'gray.100'} fontSize={16} fontFamily={'heading'}>{userName}</Text>
				</HStack>
				
				<Badge 
					alignSelf={'baseline'} 
					rounded={'full'}
					bgColor={'gray.500'}
					px={2}
					py={1}
					mt={6}
					_text={{
						fontFamily: 'body',
						fontSize: 10,
						color: 'gray.200'
					}}
				>
					{(isNew ? 'Novo' : 'Usado').toUpperCase()}
				</Badge>

				<HStack mt={2} alignItems={'center'} justifyContent={'space-between'}>
					<Heading color='gray.100' fontFamily={'body'} fontSize={20}>{title}</Heading>
					<Text color={'blue.500'} fontFamily={'body'} fontSize={20}>
						<Text fontSize={14}>R$ </Text>
						{price}
					</Text>
				</HStack>

				<Text mt={2} color={'gray.200'} fontSize={14} fontFamily={'heading'} textAlign={'justify'}>
					{description}
				</Text>
				
				<HStack mt={3} alignItems={'center'} space={2}>
					<Text color={'gray.200'} bold fontSize={14}>
						Aceita troca? 
					</Text>
					<Text color={'gray.200'} fontFamily={'heading'}>
						{isExchangeable ? 'Sim' : 'Não'}
					</Text>
				</HStack>

				<VStack mt={4}>
					<Text color={'gray.200'} fontSize={'sm'} fontFamily={'body'}>Metodos de Pagamento:</Text>

					<VStack mt={2}>
						<PaymentMethodLabels data={paymentMethods}/>
					</VStack>
				</VStack>
			</VStack>
		</VStack>		
	)
}