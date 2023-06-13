import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { House, SignOut, Tag } from 'phosphor-react-native';

import { Home } from '@screens/Home';
import { MyAnnouncements } from '@screens/MyAnnouncements';

type HomeRoutesParams = {
	home: undefined;
	myAnnouncements: undefined;
	exit: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<HomeRoutesParams>();

function Exit(){
	return <></>
}

export function HomeRoutes(){
	const theme = useTheme();

	return(
		<Navigator
			screenOptions={() => {
				return {
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: theme.colors.gray[200],
					tabBarInactiveTintColor: theme.colors.gray[400],
					tabBarStyle: {
						backgroundColor: theme.colors.gray[700],
						height: 80,
						paddingTop: 20,
						paddingBottom: 28,
					}
				}
			}}
		>
			<Screen 
				name='home'
				component={Home}
				options={{
					tabBarIcon: ({color}) => {
						return <House weight="bold" color={color} size={24} />
					} 
				}}
			/>
			<Screen 
				name='myAnnouncements'
				component={MyAnnouncements}
				options={{
					tabBarIcon: ({color}) => {
						return <Tag weight="bold" color={color} size={24} />
					}
				}}
			/>
			<Screen 
				name='exit'
				component={Exit}
				listeners={() => ({
					tabPress: (e) => {
						e.preventDefault(); // Prevents navigation
						// Your code here for when you press the tab
					},
				})}
				options={{
					tabBarIcon: () => <SignOut size={24} weight="bold" color={theme.colors.red[400]} />
				}}
			/>
				
		</Navigator>
	)
}
