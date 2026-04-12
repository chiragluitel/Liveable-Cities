// Just for testing. Remove this file when connected to neccessary pages.

import { View } from 'react-native';
import { Stack } from 'expo-router';
import CaseyMap from '../components/map/CaseyMap';

export default function Index() {
	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen options={{ headerShown: false }} />
			<CaseyMap />
		</View>
	);
}