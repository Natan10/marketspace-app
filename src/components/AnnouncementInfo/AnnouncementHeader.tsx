import { Avatar, Badge, HStack, Text } from "native-base";

interface Props {
	avatar: string;
	username: string;
	isNew: boolean;
}

export function AnnouncementHeader({avatar, username, isNew}: Props){
	return(
		<HStack my={4} alignItems={'center'} justifyContent={'space-between'}>
			<HStack mt={5} space={2} alignItems={'center'}>
				<Avatar
					source={{
						uri: avatar
					}} 
					_image={{
						resizeMode: 'cover'
					}}
					size={8}
					borderWidth={'2'}
					borderColor={'blue.400'} 
				/>
				<Text color={'gray.100'} fontSize={16} fontFamily={'heading'}>{username}</Text>
			</HStack>

			<Badge 
				alignSelf={'baseline'} 
				rounded={'full'}
				bgColor={'gray.500'}
				px={2}
				py={1}
				mt={6}
				_text={{
					fontFamily: 'body',
					fontSize: 10,
					color: 'gray.200'
				}}
			>
				{(isNew ? 'Novo' : 'Usado').toUpperCase()}
			</Badge>
		</HStack>
	)
}