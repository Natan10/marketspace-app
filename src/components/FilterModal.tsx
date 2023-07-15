import { Box, Text, Center, Checkbox, HStack, Heading, Pressable, Switch, VStack, View, useTheme, Radio } from "native-base";
import { X } from "phosphor-react-native";
import { Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { SelectButton } from "./SelectButton";
import { Button as ButtonComposition } from './Button'

type FormDataProps = {
	isNew: string;
	isExchangeable: boolean;
	paymentMethods: string[];
}

interface Props {
	isVisible: boolean;
	setIsVisible: (data: boolean) => void;
	onSendFilterParams: (data: {
		isNew: boolean
		isExchangeable: boolean
		paymentMethods: string[]
	}) => Promise<void>;
}

export function FilterModal({isVisible, setIsVisible, onSendFilterParams}: Props){
	const {control, handleSubmit, setValue, watch, reset} = useForm<FormDataProps>({
		defaultValues: {
			isNew: 'new',
			isExchangeable: false,
			paymentMethods: []
		}
	});
	const theme = useTheme();

	const isNewField = watch('isNew');

	async function getFilterParams(data: FormDataProps){
		await onSendFilterParams({
			isNew: data.isNew === 'new' ? true: false,
			isExchangeable: data.isExchangeable,
			paymentMethods: data.paymentMethods
		});
	}

	function resetFilterParams(){
		reset({
			paymentMethods: [],
			isNew: 'new',
			isExchangeable: false
		})
	}

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
								<SelectButton 
									title='novo'
									isSelected={isNewField === 'new'}
									onSelect={() => setValue('isNew', 'new')} 
								/>
								<SelectButton 
									title='usado' 
									onSelect={() => setValue('isNew', 'old')}
									isSelected={isNewField === 'old'}
								/>
							</HStack>
						</View>

						<HStack mb={4} alignItems={'center'} space={2}>
							<Text color={'gray.200'} fontSize={14} bold>Aceita troca?</Text>
							<Controller 
								control={control}
								name="isExchangeable"
								render={({field: {value, onChange}}) => (
									<Switch 
										size="sm"
										onTrackColor="blue.400" 
										onToggle={onChange}
										value={value}
									/>
								)}
							/>
						</HStack>

						<View>
							<Text color={'gray.200'} fontSize={14} bold>
								Meios de pagamento aceitos
							</Text>
							
							<Controller 
								control={control}
								name="paymentMethods"
								render={({field: {onChange, value}}) => (
									<Checkbox.Group mt={3} onChange={onChange} value={value}>
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
									value='boleto'>
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
										value='pix'>
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
										value='cash'>
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
										value='credit_card'>
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
										value='debit_card'>
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
										value='bank_deposit'>
											Depósito Bancário
										</Checkbox>
									</Checkbox.Group>
								)}
							/>
						</View>
					</VStack>

					<HStack mt={"auto"} space={3}>
						<ButtonComposition.Root
							bgColor={'gray.500'}
							flex={1}
							onPress={resetFilterParams}
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
							onPress={handleSubmit(getFilterParams)}
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