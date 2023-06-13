import React from 'react';
import { TextArea as TextAreaNativeBase, ITextAreaProps } from 'native-base';

interface Props extends ITextAreaProps{
}

export function TextArea({...rest}: Props){
	return(
		<TextAreaNativeBase
			px={4}
			py={3}
			borderRadius={6}
			color={'gray.200'}
			bgColor={'gray.700'}
			fontSize={'md'}
			_focus={{
				borderColor: 'gray.300'
			}}
			placeholderTextColor={'gray.400'}
			autoCompleteType={false}
			{...rest}
		/>
	)
}