import { HStack, Heading, Text, VStack } from "native-base";

import { PaymentMethodLabels } from "@components/PaymentMethodLabels";
import { PaymentMethodsDTO } from "@dtos/PaymentMethodsDTO";

interface Props {
	title: string;
	description: string;
	price: number;
	isExchangeable: boolean;
	paymentMethods: PaymentMethodsDTO;
}

export function AnnouncementInformation({
	title,
	price,
	description,
	isExchangeable,
	paymentMethods
}: Props){
	return(
		<>
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
		</>
	)
}