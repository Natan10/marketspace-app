import React from 'react';
import { Box, Pressable, Image, useTheme } from 'native-base';
import { Plus, XCircle } from 'phosphor-react-native';


interface Props {
	image: string;
}

export function UploadImage({image}: Props){
	const theme = useTheme();

	return image ? (
		<Box w={110} h={110} rounded={6}>
			<Pressable position={'absolute'} top={1} right={1} zIndex={10}>
				<XCircle size={20} weight="fill" />
			</Pressable>
			<Image 
				source={{
					uri: image
				}}
				alt="teste"
				size={"100%"}
				rounded={6}
				resizeMode="cover"
			/>
		</Box>
	):(
		<Box w={110} h={110} bg={"gray.500"} rounded={6} justifyContent={"center"} alignItems={"center"}>
			<Plus size={24} color={theme.colors.gray[400]} />
		</Box>
	)
}