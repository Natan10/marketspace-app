import React from 'react';
import { Box, Pressable, Image, useTheme } from 'native-base';
import { Plus, XCircle } from 'phosphor-react-native';


interface Props {
	image?: string;
	triggerUpload: () => void;
	removeUpload?: () => void;
}

export function UploadImage({image, triggerUpload, removeUpload}: Props){
	const theme = useTheme();

	return image ? (
		<Box w={110} h={110} rounded={6}>
			<Box position={'absolute'} top={1} right={1} zIndex={10}>
				<XCircle size={20} weight="fill" />	
			</Box>
			<Pressable onPress={removeUpload}>
				<Image 
					source={{
						uri: image
					}}
					alt="teste"
					size={"100%"}
					rounded={6}
					resizeMode="cover"
				/>
			</Pressable>
		</Box>
	):(
		<Pressable onPress={triggerUpload}>
			<Box w={110} h={110} bg={"gray.500"} rounded={6} justifyContent={"center"} alignItems={"center"}>
				<Plus size={24} color={theme.colors.gray[400]} />
			</Box>
		</Pressable>
	)
}