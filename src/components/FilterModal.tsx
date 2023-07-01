import { Box, Text, Center, Checkbox, HStack, Heading, Pressable, Switch, VStack, View, useTheme } from "native-base";
import { X } from "phosphor-react-native";
import { Modal } from "react-native";

import { SelectButton } from "./SelectButton";
import { Button as ButtonComposition } from './Button'

interface Props {
	isVisible: boolean;
	setIsVisible: (data: boolean) => void;
}

export function FilterModal({isVisible, setIsVisible}: Props){
	const theme = useTheme();

	return(
		<Modal
			visible={isVisible}
			animationType='slide'
			transparent
		>
			<VStack flex={1} bgColor={'gray.300:alpha.30'}>
				<VStack px={6} pb={8} pt={3} roundedTop={24} mt={'auto'} h={'630'} w={'full'} bgColor={'gray.700'}>
					<Center>
						<Box w={'54'} h={1} bgColor={'gray.400:alpha.40'}></Box>
					</Center>

					<VStack mt={8}>
						<HStack mb={6} alignItems={'center'} justifyContent={'space-between'}>
							<Heading color={'gray.100'} bold fontSize={22}>Filtrar anúncios</Heading>
							<Pressable onPress={() => setIsVisible(!isVisible)}>
								<X size={24} color={theme.colors.gray[400]} />
							</Pressable>
						</HStack>
						
						<View mb={4}>
							<Text color={'gray.200'} fontSize={14} bold>Condição</Text>
							<HStack alignItems={'center'} space={3} mt={3}>
								<SelectButton isSelected title='novo' />
								<SelectButton title='usado' />
							</HStack>
						</View>

						<HStack mb={4} alignItems={'center'} space={2}>
							<Text color={'gray.200'} fontSize={14} bold>Aceita troca?</Text>
							<Switch 
								size="sm"
								onTrackColor="blue.400" 
							/>
						</HStack>

						<View>
							<Text color={'gray.200'} fontSize={14} bold>
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

					<HStack mt={"auto"} space={3}>
						<ButtonComposition.Root
							bgColor={'gray.500'}
							flex={1}
						>
							<ButtonComposition.TitleBold
								color={'gray.200'}
								fontSize={14}
							>
								Resetar Filtros
							</ButtonComposition.TitleBold>
						</ButtonComposition.Root>
						<ButtonComposition.Root
							bgColor={'gray.200'}
							flex={1}
						>
							<ButtonComposition.TitleBold
								color={'gray.700'}
								fontSize={14}
							>
								Aplicar Filtros
							</ButtonComposition.TitleBold>
						</ButtonComposition.Root>
					</HStack>
				</VStack>
			</VStack>
		</Modal>
	)
}