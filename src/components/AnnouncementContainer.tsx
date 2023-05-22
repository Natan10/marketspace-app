import React from 'react';
import { AnnouncementCard } from './AnnouncementCard';
import { Box, FlatList } from 'native-base';

import { AnnoucementDTO } from '@dtos/AnnoucementDTO';

interface Props {
	data: AnnoucementDTO[];
}

export function AnnouncementContainer({ data }: Props){
	return(
		<FlatList 
			data={data}
			showsVerticalScrollIndicator={false}
			keyExtractor={item => item.id}
			columnWrapperStyle={{justifyContent: 'space-between'}}
			numColumns={2}
			ItemSeparatorComponent={() => <Box mb={3}></Box>}
			horizontal={false}
			renderItem={({item}) => (
				<AnnouncementCard 
					data={{
						id: item.id,
						img: item.img,
						isEnabled: item.isEnabled,
						isNewProduct: item.isNewProduct,
						price: item.price,
						title: item.title
					}} 
				/>
			)}
		/>
	)
}