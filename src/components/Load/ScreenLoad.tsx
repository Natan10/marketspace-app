import React from 'react';
import { Heading, VStack } from 'native-base';
import LottieView from 'lottie-react-native';

import loadingAnimation from '@assets/loading.json';

export function ScreenLoad(){
	return(
		<VStack flex={1} justifyContent={'center'} alignItems={'center'}>
			<LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={loadingAnimation}
      />
			<Heading fontFamily={'body'} fontSize={18} color={'gray.300'}>Carregando...</Heading>
		</VStack>
	)
}