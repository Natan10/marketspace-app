import { Box, FlatList, Skeleton } from "native-base";

export function CardLoad(){
	return(
		<FlatList 
			data={['a','b','c', 'd','e']}
			keyExtractor={item => item}
			showsVerticalScrollIndicator={false}
			columnWrapperStyle={{justifyContent: 'space-between'}}
			numColumns={2}
			ItemSeparatorComponent={() => <Box mb={3}></Box>}
			horizontal={false}
			renderItem={() => (
				<Skeleton 
					w={165} 
					h={120}
					rounded={6}
				/>
			)}
		/>
	)
}