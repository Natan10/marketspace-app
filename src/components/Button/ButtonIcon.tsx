import { IIconProps, Icon } from "native-base";

interface ButtonIconProps extends IIconProps {
	icon: JSX.Element
}

export function ButtonIcon({icon, ...rest }: ButtonIconProps){
	return icon
}