import React from 'react';
import { HStack, Pressable, Text } from 'native-base';
import { XCircle } from 'phosphor-react-native';

interface Props {
	// onSelect: () => void;
	title: string;
	isSelected?: boolean;
}

export function SelectButton({ title, isSelected = false }: Props){
	return(
		<Pressable 
			borderRadius={'full'} 
			bgColor={isSelected ? 'blue.400': 'gray.500'}
			w={20}
			p={1.5}
		>
			<HStack justifyContent={'center'} alignItems={'center'} space={1.5}>
				<Text 
					fontSize={12}
					bold
					color={isSelected ? '#FFF' : 'gray.300'}
				>
					{title.toUpperCase()}
				</Text>
				{isSelected && (
					<XCircle size={16} weight="fill" color='#fff' />
				)}
			</HStack>
		</Pressable>
	)
}