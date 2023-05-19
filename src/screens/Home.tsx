import React from 'react';
import { HStack, VStack, Box, Image, Text, useTheme, Button, Pressable, FlatList, } from 'native-base';
import { SafeAreaView } from 'react-native';
import { ArrowRight, Plus, Tag } from 'phosphor-react-native';
import { SearchInput } from '@components/SearchInput';
import { AnnouncementCard } from '@components/AnnouncementCard';

export function Home(){
	const theme = useTheme();

	return(
		<SafeAreaView style={{flex: 1, backgroundColor: theme.colors.gray[600]}}>
			<VStack flex={1} px={6}>
				{/* Header */}
				<HStack mt={5} justifyContent={'space-between'}>
					<HStack space={3} alignItems={'center'}>
						<Image 
							source={{
								uri: 'https://doodleipsum.com/700/avatar?i=a69d4814c4fc0154cc80b9d158fe6b1f'
							}}
							alt='avatar'
							resizeMode='contain'
							size={50}
							rounded={'full'}
							borderWidth={1}
							borderColor={'blue.400'}
						/>

						<Text fontSize={16} fontFamily={'heading'}>
							Boas vindas,{'\n'}
							<Text fontFamily={'body'}>Maria!</Text>
						</Text>
					</HStack>

					<Button bgColor={'gray.100'} rounded={6}>
						<HStack alignItems={'center'} space={2}>
							<Plus size={16} color={theme.colors.gray[700]} />
							<Text fontFamily={'body'} fontSize={'md'} color='gray.700'>Cria anúncio</Text>
						</HStack>
					</Button>
				</HStack>
				
				{/* Card */}
				<Box mt={8}>
					<Text color={'gray.300'} fontSize={'sm'} fontFamily={'heading'}>
						Seus produtos anunciados para venda 
					</Text>
					{/* Card */}
					<HStack
						p={4}
						mt={3} 
						w={'full'}
						rounded={6} 
						bgColor={'blue.400:alpha.20'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						{/* Icon */}
						<HStack alignItems={'center'} space={4}>
							<Tag size={20} color={'rgba(54, 77, 157, 1)'} />
							<VStack>
								<Text color={'gray.200'} fontFamily={'body'} fontSize={'lg'}>4</Text>
								<Text color={'gray.200'} fontFamily={'heading'} fontSize={'xs'}>anúncios ativos</Text>
							</VStack>
						</HStack>

						<Pressable>
							<HStack alignItems={'center'} space={2}>
								<Text fontFamily={'body'} fontSize={14} color={'blue.500'}>Meus anúncios</Text>
								<ArrowRight size={16} color={theme.colors.blue[500]} />
							</HStack>
						</Pressable>
					</HStack>
				</Box>

				{/* Search Field */}
				<Box mt={8}>
					<Text color={'gray.300'} fontSize={'sm'} fontFamily={'heading'}>
						Compre produtos variados 
					</Text>

					<SearchInput 
						mt={3}
						placeholder='Buscar anúncio'
						onSearch={() => console.log('search')}
						onFilters={() => console.log('filters')}
					/>
				</Box>

				{/* announcement cards */}
				<FlatList 
					data={new Array(5).fill(10)}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => String(item + Math.round(Math.random()*100))}
					columnWrapperStyle={{justifyContent: 'space-between'}}
					numColumns={2}
					horizontal={false}
					renderItem={() => (
						<AnnouncementCard isNewProduct />
					)}
				/>

			</VStack>
		</SafeAreaView>
	)
}