import { MapIconEntry } from '../components/Map/config/mapIcons';
import { useSettings } from '../context/SettingsContext';

//const BASE_URL = 'http://10.0.2.2:5156';

// Name fields vary per amenity type, so this covers all of them.
type AmenityRecord = {
  latitude: number;
  longitude: number;
  name?: string;
  reserveName?: string;
  parkReserveName?: string;
  address?: string;
};
type AmenityResponse = { results: AmenityRecord[] };

// Picks the best available name per amenity type, falling back to address.
function placeNameFor(name: MapIconEntry['name'], r: AmenityRecord): string | undefined {
  switch (name) {
    case 'library':
    case 'toilet':
      return r.name || r.address || undefined;
    case 'bbq':
    case 'bench':
      return r.reserveName || r.address || undefined;
    case 'fountain':
      return r.parkReserveName || r.address || undefined;
    default:
      return undefined;
  }
}

async function fetchIconsFor(base_url: string, endpoint: string, name: MapIconEntry['name']): Promise<MapIconEntry[]> {
  const res = await fetch(`${base_url}${endpoint}`);
  const data: AmenityResponse = await res.json();
  return data.results.map(r => ({
    name,
    lat: r.latitude,
    lng: r.longitude,
    placeName: placeNameFor(name, r),
  }));
}

export async function fetchAllAmenityIcons(base_url: string): Promise<MapIconEntry[]> {
  const results = await Promise.all([
    fetchIconsFor(base_url, '/api/GetBenches', 'bench'),
    fetchIconsFor(base_url, '/api/GetPublicToilets', 'toilet'),
    fetchIconsFor(base_url, '/api/GetLibraries', 'library'),
    fetchIconsFor(base_url, '/api/GetBbqs', 'bbq'),
    fetchIconsFor(base_url, '/api/GetDrinkingFountains', 'fountain'),
  ]);
  return results.flat();
}
