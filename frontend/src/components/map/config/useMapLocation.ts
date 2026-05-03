import { Alert } from 'react-native';
import * as Location from 'expo-location';

export type UserLocation = { lat: number; lng: number };

async function requestPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Location Permission', 'Please enable location access.');
    return false;
  }
  return true;
}

// Watches the user's position continuously, firing onUpdate each time they move 5+ metres.
export async function watchLocation(
  onUpdate: (loc: UserLocation) => void
): Promise<Location.LocationSubscription | null> {
  const granted = await requestPermission();
  if (!granted) return null;

  return Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, distanceInterval: 5 },
    loc => onUpdate({ lat: loc.coords.latitude, lng: loc.coords.longitude })
  );
}
