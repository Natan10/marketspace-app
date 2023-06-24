import React from 'react';
import { Spinner, VStack } from 'native-base';

export function Load(){
	return(
		<VStack flex={1} justifyContent={'center'} alignItems={'center'}>
			<Spinner color="blue.500" size='lg' />
		</VStack>
	)
}