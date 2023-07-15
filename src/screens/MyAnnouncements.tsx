import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Platform, SafeAreaView } from "react-native";
import { Center, Heading, View, useTheme, Text, Select, HStack, VStack, Pressable, useToast } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";

import { AnnouncementContainer } from "@components/AnnouncementContainer";
import { useAuth } from "@contexts/AuthProvider";

import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { Announcement } from "@dtos/AnnoucementDTO";
import { api } from "@services/api";
import { LoadRoot } from "@components/Load";

type FilterType = 'all'|'used'|'new';
export function MyAnnouncements(){
	const theme = useTheme();
	const toast = useToast();
	const {user} = useAuth();
	const navigator = useNavigation<AuthNavigatorRouteProps>();

	const [isLoading, setIsLoading] = useState(false);
	const [filterType, setFilterType] = useState<FilterType>('all');
	const [userAnnouncements, setUserAnnouncements] = useState<Announcement[]>([]);

	function handleNavigateToCreateNewAnnouncement(){
		navigator.navigate('newAnnouncement');
	}

	async function loadAnnouncementsByUser() {
		setIsLoading(true);
		try {
			const {data} = await api.get(`/users/${user?.id}/announcements`, {
				params: {
					type: filterType === 'all' ? undefined : filterType 
				}
			});
			setUserAnnouncements(data.data);
		} catch(error) {
			console.error(error);
			toast.show({
				title: 'Erro ao carregar anúncios',
				backgroundColor: 'red.400',
				placement: 'top'
			});
		} finally{
			setIsLoading(false);
		}
	}

	useFocusEffect(useCallback(() => {
		loadAnnouncementsByUser();
	}, [filterType]));

	return (
		<SafeAreaView 
			style={{
				flex: 1, 
				backgroundColor: theme.colors.gray[600],
				paddingVertical: Platform.OS === 'android' ? 25:0 
			}}>
			<VStack px={6} flex={1}>
				<Center mt={6} flexDirection={'row'} position={'relative'} alignItems={'center'}>
					<Heading color={'gray.100'} fontSize={20} fontFamily={'body'}>Meus Anúncios</Heading>
					<Pressable onPress={handleNavigateToCreateNewAnnouncement} position={'absolute'} right={0}>
						<Plus size={24} color={theme.colors.gray[100]} />
					</Pressable>
				</Center>

				<HStack mb={5} mt={8} alignItems={'center'} justifyContent={'space-between'}>
					{isLoading ? (
						<Text color={'gray.200'} fontSize={14} fontFamily={'heading'}>Carregando anúncios</Text>
					):(
						<Text color={'gray.200'} fontSize={14} fontFamily={'heading'}>{userAnnouncements.length} anúncios</Text>
					)}
					<Select 
						borderRadius={6} 
						_text={{
							fontFamily: 'heading',
							fontSize: 14,
							color: 'gray.100'
						}}
						minW={32}
						minH={8}
						selectedValue={filterType}
						dropdownIcon={<CaretDown style={{marginRight: 12}} size={16}/>}
						onValueChange={item => setFilterType(item as FilterType)}
					>
						<Select.Item label="Todos" value="all" />
						<Select.Item label="Novo" value="new" />
						<Select.Item label="Usado" value="used" />
					</Select>
				</HStack>
					
				<View flex={1} pb={6}>
					{isLoading ? <LoadRoot.Card /> : (
						<AnnouncementContainer data={userAnnouncements} />
					)}
				</View>
			</VStack>
		</SafeAreaView>
	)
}