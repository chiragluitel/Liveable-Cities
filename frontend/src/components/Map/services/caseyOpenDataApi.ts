import { IconName, MapIconEntry } from '../config/mapIcons';

const API_BASE_URL = 'http://localhost:5156';

export type CaseyOpenDataPlace = {
  id: string;
  name: string;
  type: IconName;
  datasetId: string;
  lat: number;
  lng: number;
};

export async function fetchCaseyOpenDataPlaces(
  filters: IconName[] = ['bbq', 'offLeash', 'toilet']
): Promise<MapIconEntry[]> {
  const query = encodeURIComponent(filters.join(','));

  const response = await fetch(
    `${API_BASE_URL}/api/casey-open-data/places?filters=${query}&limit=100`
  );

  if (!response.ok) {
    throw new Error('Failed to load Casey open data places');
  }

  const places: CaseyOpenDataPlace[] = await response.json();

  return places.map(place => ({
    id: place.id,
    name: place.type,
    lat: place.lat,
    lng: place.lng,
    label: place.name,
  }));
}