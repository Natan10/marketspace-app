import React, { useEffect, useState } from "react";
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
	Checkbox, 
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { UploadImage } from "@components/UploadImage";
import { Button as ButtonComposition } from '@components/Button';
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { usePreviewContext } from "@contexts/PreviewProvider";
import { api } from "@services/api";
import { useAuth } from "@contexts/AuthProvider";
import { Announcement } from "@dtos/AnnoucementDTO";
import { LoadRoot } from "@components/Load";
import { getAnnouncementPhotosUrl } from "@helpers/getURIs";

const schema = z.object({
	title: z.string({
		required_error: 'Insira um título'
	}).min(2, {message: 'Insira um título maior'}),
	description: z.string().optional(),
	isNew: z.string(),
	isExchangeable: z.boolean().default(false),
	price: z.string({required_error: 'Insira um preço'}),
	paymentMethods: z.array(z.string()),
});

type FormProps = z.infer<typeof schema>;

export function NewAnnouncement(){
	const { control, handleSubmit, formState: {errors}, setValue } = useForm<FormProps>({
		resolver: zodResolver(schema)
	});
	const {user} = useAuth();
	const theme = useTheme();
	const navigator = useNavigation<AuthNavigatorRouteProps>();
	const { params } = useRoute() as any;
	const { setPreviewData } = usePreviewContext();

	const [isLoading, setIsLoading] = useState(false);
	const [photos, setPhotos] = useState<string[]>([]);
	
	async function handleCreateNewAnnouncement(data: FormProps){
		setPreviewData({
			title: data.title,
			description: data.description || '',
			isExchangeable: data.isExchangeable,
			isNew: data.isNew === 'new' ? true : false,
			price: +data.price,
			images: photos,
			paymentMethods: data.paymentMethods,
			announcementId: params &&  params.announcementId
		});
		navigator.navigate('previewAnnouncement');
	}

	async function uploadImages(){
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
			
		if (result.assets) {
			const uri = result.assets[0].uri
			setPhotos(old => [...old, uri]);
		}
	}
	
	function removeUpload(key: number) {
		const data = photos;
		data.splice(key, 1);
		setPhotos([...data])
	}

	async function loadEditAnnouncementInformation(announcementId: string){
		try {
			const {data} = await api.get(`/announcements/${announcementId}?userId=${user?.id}`);
			const payload = data.data as Announcement;

			const paymentMethods = Object.entries(payload.payment_methods).filter(([_,v]) => v === true).map(([k, _]) => k)
			
			setValue('title', payload.title);
			setValue('description', payload.description);
			setValue('isNew', payload.is_new ? 'new' : 'old');
			setValue('isExchangeable', payload.is_exchangeable);
			setValue('price', String(payload.price));
			setValue('paymentMethods', paymentMethods);

			setPhotos(payload.images);
		}catch(err) {
			console.error(err);
		}
	}

	useEffect(() => {
		// edit		
		(async() => {
			setIsLoading(true);
			if(params && params.announcementId) {
				await loadEditAnnouncementInformation(params.announcementId)
			}
			setIsLoading(false);
		})();
	}, []);

	return isLoading ? <LoadRoot.Screen /> : (
		<VStack flex={1} bgColor={'gray.600'} pt={8}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack px={6} pb={8} pt={6}>
					<Center position={'relative'} display={'flex'} flexDir={'row'}>
						<Pressable onPress={() => navigator.goBack()} position={'absolute'} left={0}>
							<ArrowLeft size={24} weight="bold" color={theme.colors.gray[200]} />
						</Pressable>
						<Heading color="gray.100" fontFamily="body" fontSize={20}>{params && params.announcementId ? 'Editar' : 'Novo'} anúncio</Heading>
					</Center>

					<VStack mt={6}>
						<Text color="gray.200" fontSize={16} fontFamily={"body"}>Imagens</Text>
						<Text color="gray.300" fontSize={14} fontFamily={"heading"}>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!</Text>
					
						<HStack mt={4} space={3}>
							{!photos.length ? (
								<UploadImage 
									triggerUpload={uploadImages} 
									image={undefined} 
								/>
							):(
								<>
									{photos[0] ? (
										<UploadImage 
											triggerUpload={uploadImages} 
											image={params && params.announcementId ? getAnnouncementPhotosUrl([photos[0]])[0] : photos[0]}  
											removeUpload={() => removeUpload(0)}
										/>
									): (
										<UploadImage 
											triggerUpload={uploadImages} 
											image={undefined} 
										/>
									)}
									{photos[1] ? (
										<UploadImage 
											triggerUpload={uploadImages} 
											image={params && params.announcementId ? getAnnouncementPhotosUrl([photos[1]])[0] : photos[1]}  
											removeUpload={() => removeUpload(1)}
										/>
									): (
										<UploadImage 
											triggerUpload={uploadImages} 
											image={undefined} 
										/>
									)}
									{photos[2] ? (
										<UploadImage 
											triggerUpload={uploadImages} 
											image={params && params.announcementId ? getAnnouncementPhotosUrl([photos[2]])[0] : photos[2]}  
											removeUpload={() => removeUpload(2)}
										/>
									):(
										<UploadImage 
											triggerUpload={uploadImages} 
											image={undefined} 
										/>
									)}
								</>
							)}
						</HStack>
					</VStack>

					<VStack mt={8} space={4}>
						<Text color="gray.200" fontSize={16}>Sobre o Produto</Text>
						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input 
									placeholder="Título do anúncio"
									fontFamily={"heading"}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
								/>
							)}
							name="title"
						/>
						<Controller 
							control={control}
							name="description"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextArea 
									h={160} 
									placeholder="Descrição do produto" 
									fontFamily={"heading"}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value} 
								/>
							)}
						/>

						<Controller 
							control={control}
							name="isNew"
							render={({ field: { onChange, value } }) => (
								<Radio.Group 
									colorScheme={'blue'} 
									onChange={onChange} 
									name="product type"  
									accessibilityLabel="product type"
									value={value}
								>
									<HStack w={"full"} space={5}>
										<Radio value={'new'}>
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
							)}
						/>
					</VStack>

					<View mt={8}>
						<Text color="gray.200" fontSize={16}>Venda</Text>
						<Controller 
							name="price"
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input 
									mt={2}
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									placeholder="Valor do produto" 
									fontFamily={"heading"}
									keyboardType="numeric"
									InputLeftElement={<Text fontSize={16} fontFamily={'heading'} ml={4}>R$</Text>} 
								/>
							)}
						/>
					</View>

					<HStack mt={4} alignItems={'center'} space={2}>
						<Text color={'gray.200'} fontSize={14} bold>Aceita troca?</Text>
						<Controller 
							control={control}
							name="isExchangeable"
							render={({field: {onChange, value}}) => (
								<Switch 
									size="sm"
									onTrackColor="blue.400" 
									onValueChange={onChange}
									value={value}
								/>
							)}
						/>
					</HStack>

					<View mt={4}>
						<Text color={'gray.200'} fontSize={16} bold>
							Meios de pagamento aceitos
						</Text>

						<Controller 
							control={control}
							name="paymentMethods"
							render={({field: {onChange, value}}) => (
								<Checkbox.Group onChange={onChange} mt={3} value={value}>
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
			</ScrollView>

			<HStack p={6} pb={'30'} space={4} bgColor={'gray.700'} alignItems={'center'} justifyContent={'space-between'}>
				<ButtonComposition.Root onPress={() => navigator.goBack()} bgColor={'gray.500'} flex={1} rounded={6}>
					<ButtonComposition.TitleBold fontSize={14} color={'gray.200'}>
						Cancelar
					</ButtonComposition.TitleBold>
				</ButtonComposition.Root>
				
				<ButtonComposition.Root 
					onPress={handleSubmit(handleCreateNewAnnouncement)} 
					bgColor={'gray.100'} flex={1} 
					rounded={6}
				>
					<ButtonComposition.TitleBold fontSize={14} color={'gray.700'}>
						Avançar
					</ButtonComposition.TitleBold>
				</ButtonComposition.Root>
			</HStack>
		</VStack>
	)
}