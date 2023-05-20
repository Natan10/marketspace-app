import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';

type AuthRoutesParams = {
	home: undefined;
	myAnnouncement: undefined;
}


const { Navigator, Screen } = createBottomTabNavigator<AuthRoutesParams>();

export function AuthRoutes(){
	return(
		<Navigator>
			<Screen 
				name='home'
				component={Home}
			/>
		</Navigator>
	)
}
