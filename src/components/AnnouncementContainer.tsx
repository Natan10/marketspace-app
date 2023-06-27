import React from 'react';
import { AnnouncementCard } from './AnnouncementCard';
import { Box, FlatList } from 'native-base';

import { Announcement } from '@dtos/AnnoucementDTO';

interface Props {
	data: Announcement[];
}

export function AnnouncementContainer({ data }: Props){
	return(
		<FlatList 
			data={data}
			showsVerticalScrollIndicator={false}
			keyExtractor={item => String(item.id)}
			columnWrapperStyle={{justifyContent: 'space-between'}}
			numColumns={2}
			ItemSeparatorComponent={() => <Box mb={3}></Box>}
			horizontal={false}
			renderItem={({item}) => (
				<AnnouncementCard 
					data={{
						id: item.id,
						photos: item.images,
						isNew: item.is_new,
						price: item.price,
						title: item.title
					}} 
					announcementUserId={String(item.user_id)}
				/>
			)}
		/>
	)
}