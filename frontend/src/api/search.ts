import { Places } from '@Types/walkPlannerTypes';

const BASE_URL = 'http://10.0.2.2:5156';

type PlaceSearchRecord = {
  id: string;
  title: string;
  streetAddress: string;
  suburb: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  type: string;
};

type SearchResponse = { totalCount: number; results: PlaceSearchRecord[] };

function toPlace(r: PlaceSearchRecord): Places {
  return {
    id: r.id,
    title: r.title,
    streetAddress: r.streetAddress,
    suburb: r.suburb,
    state: r.state,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
    type: r.type,
  };
}

export async function searchPlaces(
  query: string,
  signal?: AbortSignal,
): Promise<Places[]> {
  const res = await fetch(
    `${BASE_URL}/api/Search?q=${encodeURIComponent(query)}`,
    { signal },
  );

  if (!res.ok) {
    throw new Error(`Search failed with status ${res.status}`);
  }

  const data: SearchResponse = await res.json();
  return data.results.map(toPlace);
}
