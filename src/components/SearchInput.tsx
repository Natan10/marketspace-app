import React from 'react';
import { Input, IInputProps, HStack, Text, useTheme } from 'native-base';
import { MagnifyingGlass, Sliders } from 'phosphor-react-native';
import { Pressable } from 'react-native';

interface Props extends IInputProps{
	onSearch: () => void;
	onFilters: () => void;
}

export function SearchInput({onSearch, onFilters,...rest}: Props){
	const theme = useTheme();
	return(
		<Input 
		p={4}
		borderRadius={6}
		color={'gray.200'}
		bgColor={'gray.700'}
		fontFamily={'heading'}
		fontSize={16}
		_focus={{
			borderColor: 'gray.700'
		}} 
		InputRightElement={
			<HStack alignItems={'center'} space={2} mr={4}>
				<Pressable onPress={onSearch}>
					<MagnifyingGlass size={22} color={theme.colors.gray[200]} />
				</Pressable>
				<Text color={'gray.400'}>|</Text>
				<Pressable onPress={onFilters}>
					<Sliders size={22} color={theme.colors.gray[200]} />
				</Pressable>
			</HStack>
		}
			{...rest}
		/>
	)
}