import React from "react";
import { SafeAreaView } from "react-native";
import { Center, Heading, View, useTheme, Text, Select, HStack, VStack, Pressable } from "native-base";
import { CaretDown, Plus } from "phosphor-react-native";
import { AnnouncementContainer } from "@components/AnnouncementContainer";
import { annoucementsMock } from "../mocks/annoucements";

export function MyAnnouncements(){
	const theme = useTheme();

	return(
		<SafeAreaView style={{flex: 1, backgroundColor: theme.colors.gray[600]}}>
			<VStack px={6} flex={1}>
				<Center mt={6} flexDirection={'row'} position={'relative'} alignItems={'center'}>
					<Heading color={'gray.100'} fontSize={20} fontFamily={'body'}>Meus Anúncios</Heading>
					<Pressable position={'absolute'} right={0}>
						<Plus size={24} color={theme.colors.gray[100]} />
					</Pressable>
				</Center>

				<HStack mb={5} mt={8} alignItems={'center'} justifyContent={'space-between'}>
					<Text color={'gray.200'} fontSize={14} fontFamily={'heading'}>9 anúncios</Text>
					<Select 
						borderRadius={6} 
						_text={{
							fontFamily: 'heading',
							fontSize: 14,
							color: 'gray.100'
						}}
						minW={32}
						minH={8}
						selectedValue="all"
						dropdownIcon={<CaretDown style={{marginRight: 12}} size={16}/>}
					>
						<Select.Item label="Todos" value="all" />
						<Select.Item label="Novo" value="new" />
						<Select.Item label="Usado" value="used" />
					</Select>
				</HStack>
					
				<View flex={1} pb={6}>
					<AnnouncementContainer data={annoucementsMock} />
				</View>
			</VStack>
		</SafeAreaView>
	)
}