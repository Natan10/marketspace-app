import React from 'react';
import { Avatar, HStack, VStack, Text, Badge, Heading } from 'native-base';

import { ImageSlider } from './ImageSlider';
import { PaymentMethodLabels } from './PaymentMethodLabels';

interface Props {
	userPhoto: string;
	userName: string;
	isNew: boolean;
	title: string;
	price: number;
	description: string;
	isExchangeable: boolean;
	photos: string[];
	isDisabled: boolean;
}

export function AnnouncementData(){
	return(
		<VStack>
			<ImageSlider />
			<VStack px={6}>
				<HStack mt={5} space={2} alignItems={'center'}>
					<Avatar
						source={{
							uri: 'https://doodleipsum.com/700/avatar?i=5492b36b36fd72e8c51c8340deea025d'
						}} 
						_image={{
							resizeMode: 'contain'
						}}
						size={8}
						borderWidth={'2'}
						borderColor={'blue.400'} 
					/>
					<Text color={'gray.100'} fontSize={16} fontFamily={'heading'}>Makenna Baptista</Text>
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
					{'Novo'.toUpperCase()}
				</Badge>

				<HStack mt={2} alignItems={'center'} justifyContent={'space-between'}>
					<Heading color='gray.100' fontFamily={'body'} fontSize={20}>Bicileta</Heading>
					<Text color={'blue.500'} fontFamily={'body'} fontSize={20}>
						<Text fontSize={14}>R$ </Text>
						120,00
					</Text>
				</HStack>

				<Text mt={2} color={'gray.200'} fontSize={14} fontFamily={'heading'} textAlign={'justify'}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non rem iure quisquam enim distinctio nihil, ratione labore reiciendis fuga nulla ipsam maiores expedita, assumenda earum dolorem sit possimus, illo magni?
				</Text>
				
				<HStack mt={3} alignItems={'center'} space={2}>
					<Text color={'gray.200'} bold fontSize={14}>
						Aceita troca? 
					</Text>
					<Text color={'gray.200'} fontFamily={'heading'}>Sim</Text>
				</HStack>

				<VStack mt={4}>
					<Text color={'gray.200'} fontSize={'sm'} fontFamily={'body'}>Metodos de Pagamento:</Text>

					<VStack mt={2}>
						<PaymentMethodLabels />
					</VStack>
				</VStack>
			</VStack>
		</VStack>		
	)
}