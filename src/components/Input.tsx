import React from 'react';
import { Input as InputNativeBase, IInputProps, useTheme } from 'native-base';
import { Eye } from 'phosphor-react-native';

interface Props extends IInputProps{
	hasPassword?: boolean;
}

export function Input({hasPassword = false,...rest}: Props){
	const theme = useTheme();
	return(
		<InputNativeBase
			px={4}
			py={3}
			borderRadius={6}
			color={'gray.200'}
			bgColor={'gray.700'}
			fontSize={'md'}
			_focus={{
				borderColor: 'gray.300'
			}} 
			InputRightElement={hasPassword ? 
				<Eye size={20} style={{marginRight: 16}} color={theme.colors.gray[300]} />
				: undefined
			}
			{...rest}
		/>
	)
}