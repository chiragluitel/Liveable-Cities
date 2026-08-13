import { MapIconEntry } from '../components/Map/config/mapIcons';

const BASE_URL = 'http://10.0.2.2:5156';

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

async function fetchIconsFor(endpoint: string, name: MapIconEntry['name']): Promise<MapIconEntry[]> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  const data: AmenityResponse = await res.json();
  return data.results.map(r => ({
    name,
    lat: r.latitude,
    lng: r.longitude,
    placeName: placeNameFor(name, r),
  }));
}

export async function fetchAllAmenityIcons(): Promise<MapIconEntry[]> {
  const results = await Promise.all([
    fetchIconsFor('/api/GetBenches', 'bench'),
    fetchIconsFor('/api/GetPublicToilets', 'toilet'),
    fetchIconsFor('/api/GetLibraries', 'library'),
    fetchIconsFor('/api/GetBbqs', 'bbq'),
    fetchIconsFor('/api/GetDrinkingFountains', 'fountain'),
  ]);
  return results.flat();
}
