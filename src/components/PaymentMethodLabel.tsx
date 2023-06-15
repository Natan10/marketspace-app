import { HStack, Text } from 'native-base';
import React from 'react';

interface Props {
	title: string;
	icon: JSX.Element;
}

export function PaymentMethodLabel({title, icon}: Props){
	return(
		<HStack alignItems={'center'} space={2}>
			{icon}
			<Text color={'gray.200'} fontSize={14} fontWeight={'normal'}>{title}</Text>
		</HStack>
	)
}