import { Button, HStack, IButtonProps } from 'native-base';
import { ReactNode } from 'react';

interface ButtonRootProps extends IButtonProps {
	children: ReactNode;
}

export function ButtonRoot({ children, ...rest }: ButtonRootProps){
	return(
		<Button {...rest}>
			<HStack alignItems={'center'} space={2}>
				{children}
			</HStack>
		</Button>
	)
}