import React from 'react';
import { Avatar, HStack, View, useTheme, Text, VStack, Badge, Heading, ScrollView, Button} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { ArrowLeft, Barcode, CreditCard, Money, QrCode, WhatsappLogo } from 'phosphor-react-native';

import { ImageSlider } from '@components/ImageSlider';
import { PaymentMethodLabel } from '@components/PaymentMethodLabel';

import { AuthNavigatorRouteProps } from '@routes/auth.routes';

export function DetailsAnnouncement() {
	const theme = useTheme();

	const navigator = useNavigation<AuthNavigatorRouteProps>();

	return(
		<VStack bgColor={'gray.600'} pt={9} flex={1}>
			<ScrollView  showsVerticalScrollIndicator={false}>
				<VStack pb={8}>
					<View px={6} mt={3}>
						<Pressable onPress={() => navigator.goBack()}>
							<ArrowLeft size={24} weight="bold" color={theme.colors.gray[200]} />
						</Pressable>
					</View>

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
								<PaymentMethodLabel 
									title="Boleto" 
									icon={<Barcode size={16} />}
								/>
								<PaymentMethodLabel 
									title="Pix" 
									icon={<QrCode size={16} />}
								/>
								<PaymentMethodLabel 
									title="Dinheiro" 
									icon={<Money size={16} />}
								/>
								<PaymentMethodLabel 
									title="Cartão de Crédito" 
									icon={<CreditCard size={16} />}
								/>
							</VStack>
						</VStack>
					</VStack>
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