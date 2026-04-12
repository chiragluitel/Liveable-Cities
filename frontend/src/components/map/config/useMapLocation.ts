import { Alert } from 'react-native';
import * as Location from 'expo-location';

export type UserLocation = {
	lat: number;
	lng: number;
};

// Asks for location permission then returns the user's current coords.
// Returns null if permission is denied or if there's an error getting the location.
export async function getLocation(): Promise<UserLocation | null> {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		Alert.alert('Location Permission', 'Please enable location access.');
		return null;
	}
	try {
		const loc = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
		});
		return {
			lat: loc.coords.latitude,
			lng: loc.coords.longitude,
		};
	} catch {
		Alert.alert('Error', 'Could not get your location.');
		return null;
	}
}
