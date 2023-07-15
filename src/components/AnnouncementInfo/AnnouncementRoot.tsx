import React from "react"
import { VStack } from "native-base";

interface Props {
	children: React.ReactNode;
}

export function AnnouncementRoot({children}: Props){
	return(
		<VStack>
			{children}
		</VStack>
	)
}