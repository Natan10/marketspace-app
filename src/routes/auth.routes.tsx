import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';

import { HomeRoutes } from './home.routes';
import { NewAnnouncement } from '@screens/NewAnnouncement';
import { DetailsAnnouncement } from '@screens/DetailsAnnouncement';
import { PreviewAnnouncement } from '@screens/PreviewAnnouncement';
import { PublishAnnouncement } from '@screens/PublishAnnouncement';

type AuthRoutesParams = {
	homeRoutes: undefined;
	newAnnouncement: undefined | { announcementId: string};
	detailAnnouncement: {announcementId: string, userId: string};
	publishAnnouncement: {announcementId: string};
	previewAnnouncement: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParams>();

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRoutesParams>;

export function AuthRoutes(){
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
				name='homeRoutes'
				component={HomeRoutes}
			/>
			<Screen 
				name='newAnnouncement'
				component={NewAnnouncement}
			/>
			<Screen 
				name='detailAnnouncement'
				component={DetailsAnnouncement}
			/>
			<Screen 
				name='previewAnnouncement'
				component={PreviewAnnouncement}
			/>
			<Screen 
				name='publishAnnouncement'
				component={PublishAnnouncement}
			/>
		</Navigator>
	)
}
