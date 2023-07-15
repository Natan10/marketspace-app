import { VStack } from "native-base";

interface Props {
	children: React.ReactNode;
}

export function AnnouncementContainer({ children }: Props){
	return(
		<VStack px={8}>
			{children}
		</VStack>
	)
}