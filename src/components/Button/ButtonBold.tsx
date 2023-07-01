import { Text, ITextProps } from 'native-base';


interface ButtonTitleProps extends ITextProps {
	children: string;
}

export function ButtonBold({children, ...rest}: ButtonTitleProps){
	return(
		<Text fontFamily={'body'} {...rest}>
			{children}
		</Text>
	)
}