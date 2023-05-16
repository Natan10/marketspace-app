import React from 'react';
import { Input as InputNativeBase, IInputProps } from 'native-base';

interface Props extends IInputProps{}

export function Input({...rest}: Props){
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
			{...rest}
		/>
	)
}