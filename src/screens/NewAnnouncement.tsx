import React from "react";
import { 
	Center,
	Heading,
	Pressable,
	ScrollView,
	VStack,
	View,
	Text,
	Radio,
	useTheme,
	HStack,
	Switch,
	Button,
	Checkbox, 
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";

import { UploadImage } from "@components/UploadImage";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";

export function NewAnnouncement(){
	const theme = useTheme();
	const navigator = useNavigation<AuthNavigatorRouteProps>()

	const image = "https://doodleipsum.com/700/hand-drawn?bg=C863D9&i=ffb35a759db9bc3a62cda110c460c889"

	return(
		<VStack flex={1} bgColor={'gray.600'} pt={8}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack px={6} pb={8} pt={6}>
					<Center position={'relative'} display={'flex'} flexDir={'row'}>
						<Pressable onPress={() => navigator.goBack()} position={'absolute'} left={0}>
							<ArrowLeft size={24} weight="bold" color={theme.colors.gray[200]} />
						</Pressable>
						<Heading color="gray.100" fontFamily="body" fontSize={20}>Criar anúncio</Heading>
					</Center>

					<VStack mt={6}>
						<Text color="gray.200" fontSize={16} fontFamily={"body"}>Imagens</Text>
						<Text color="gray.300" fontSize={14} fontFamily={"heading"}>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</Text>
					
						<HStack mt={4} justifyContent={"space-between"}>
							<UploadImage image={image} />
							<UploadImage image={''} />
							<UploadImage image={''} />
						</HStack>
					</VStack>

					<VStack mt={8} space={4}>
						<Text color="gray.200" fontSize={16}>Sobre o Produto</Text>
						<Input 
							placeholder="Título do anúncio"
							fontFamily={"heading"}
						/>
						<TextArea h={160} placeholder="Descrição do produto" fontFamily={"heading"} />

						<Radio.Group colorScheme={'blue'} name="product type"  accessibilityLabel="product type">
							<HStack w={"full"} space={5}>
								<Radio value="new">
									<Text color={'gray.200'} fontSize={16} fontFamily={'heading'}>
										Produto novo
									</Text>
								</Radio>
								<Radio value="old" >
									<Text color={'gray.200'} fontSize={16} fontFamily={'heading'}>
										Produto usado
									</Text>
								</Radio>
							</HStack>
						</Radio.Group>
					</VStack>

					<View mt={8}>
						<Text color="gray.200" fontSize={16}>Venda</Text>
						<Input 
							mt={2}
							placeholder="Valor do produto" 
							fontFamily={"heading"}
							keyboardType="numeric"
							InputLeftElement={<Text fontSize={16} fontFamily={'heading'} ml={4}>R$</Text>} 
						/>
					</View>

					<HStack mt={4} alignItems={'center'} space={2}>
						<Text color={'gray.200'} fontSize={14} bold>Aceita troca?</Text>
						<Switch 
							size="sm"
							onTrackColor="blue.400" 
						/>
					</HStack>

					<View mt={4}>
						<Text color={'gray.200'} fontSize={16} bold>
							Meios de pagamento aceitos
						</Text>

						<Checkbox.Group mt={3}>
							<Checkbox borderWidth={1} mb={2} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Boleto
							</Checkbox>
							<Checkbox borderWidth={1} mb={2} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Pix
							</Checkbox>
							<Checkbox borderWidth={1} mb={2} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Dinheiro
							</Checkbox>
							<Checkbox borderWidth={1} mb={2} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Cartão de Crédito
							</Checkbox>
							<Checkbox borderWidth={1} mb={2} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Cartão de Débito
							</Checkbox>
							<Checkbox borderWidth={1} 
								_checked={{
								bgColor: 'blue.400',
								borderColor: 'blue.400'
							}} 
							_text={{
								fontSize: 16,
								color: 'gray.200',
								fontFamily: 'heading',
							}}
							value='Teste'>
								Depósito Bancário
							</Checkbox>
						</Checkbox.Group>
					</View>
				</VStack>
			</ScrollView>

			<HStack p={6} pb={'30'} space={4} bgColor={'gray.700'} alignItems={'center'} justifyContent={'space-between'}>
				<Button flex={1} rounded={6} bgColor={'gray.500'}>
					<Text fontSize={14} color={'gray.200'}>
						Cancelar
					</Text>
				</Button>
				<Button onPress={() => navigator.navigate('previewAnnouncement')} flex={1} rounded={6} bgColor={'gray.100'}>
					<Text fontSize={14} color={'gray.700'}>
						Avançar
					</Text>
				</Button>
			</HStack>
		</VStack>
	)
}