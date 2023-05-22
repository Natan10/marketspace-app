import React from 'react';
import { VStack, Box, Image, Text, Avatar } from 'native-base';

import { AnnoucementDTO } from '@dtos/AnnoucementDTO';

interface Props {
	data: AnnoucementDTO;
}

export function AnnouncementCard({data: {isNewProduct, isEnabled, price, title, avatar}}: Props){
	const iNewTag = (isNewProduct ? 'Novo':'Usado').toUpperCase();

	return(
		<VStack mt={4}>
			<Box position={'relative'} w={165} h={120} bgColor={'red.500'} rounded={6}
			>
				<Image 
					source={{
						uri: 'https://doodleipsum.com/700/hand-drawn?i=f1e89bf777357d4ac29c8ecbde156bb1'
					}}
					alt='tenis vermelho'
					opacity={isEnabled ? 100 : 40}
					resizeMode='contain'
					size={'full'}
				/>
				<Box 
					position={'absolute'} 
					right={1} top={1.5} 
					bgColor={isNewProduct ? 'blue.500':'gray.200'} 
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
				{avatar && (
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
				)}
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