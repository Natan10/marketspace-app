import React, { useState } from 'react';
import { Input as InputNativeBase, IInputProps, useTheme, Pressable } from 'native-base';
import { Eye, EyeSlash } from 'phosphor-react-native';

interface Props extends IInputProps{
	hasPassword?: boolean;
}

export function Input({hasPassword = false,...rest}: Props){
	const [isPassword, setIsPassword] = useState(hasPassword);
	const theme = useTheme();

	return(
		<InputNativeBase
			px={4}
			py={3}
			borderRadius={6}
			color={'gray.200'}
			bgColor={'gray.700'}
			fontSize={'md'}
			secureTextEntry={isPassword}
			_focus={{
				borderColor: 'gray.300'
			}} 
			InputRightElement={hasPassword ? 
				<Pressable onPress={() => setIsPassword(old => !old)}>
					{isPassword ? (
						<EyeSlash size={20} style={{marginRight: 16}} color={theme.colors.gray[300]} />
					): (
						<Eye size={20} style={{marginRight: 16}} color={theme.colors.gray[300]} />
					)}
				</Pressable>
				: undefined
			}
			{...rest}
		/>
	)
}