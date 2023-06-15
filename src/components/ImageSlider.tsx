import React, { useRef, useState } from "react";
import { FlatList, Image, Box, HStack } from "native-base";
import { ViewToken } from "react-native";

interface ImageChangeProps {
	viewableItems: ViewToken[];
	changed: ViewToken[];
}

export function ImageSlider(){
	const [currentIndex, setCurrentIndex] = useState(0);
	const imageCounter = [1,2,3]
	const currentIndexRef = useRef((info: ImageChangeProps) => {
		const index = info.viewableItems[0].index!;
		setCurrentIndex(index);
	});

	return(
		<Box position={'relative'}>
			<FlatList 
				data={imageCounter}
				keyExtractor={item => String(item)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{
					px: 2
				}}
				onViewableItemsChanged={currentIndexRef.current}
				renderItem={({item}) => {
					return(
						<Image 
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6kpF8ZlX8rMuyEOuR7PSLiCD_EDM4XLUQw&usqp=CAU'
							}}
							resizeMode='cover'
							alt='bike'
							size={96}
						/>
					)
				}}
			/>
			<HStack position={'absolute'} bottom={'1'} space={1} px={'1'}>
				{imageCounter.map((image, key) => (
					<Box 
						key={key} 
						flex={1} h={1} 
						rounded={'full'} 
						bgColor={key === currentIndex ? 'gray.700:alpha.75':'gray.700:alpha.50'}
					/>
				))}
			</HStack>
		</Box>
	)
}