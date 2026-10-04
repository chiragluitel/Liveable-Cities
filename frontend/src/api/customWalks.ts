import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:5156';

// Walks belong to the logged-in user; walks made while logged out are kept under "guest".
const getUserId = async () => (await AsyncStorage.getItem('username')) || 'guest';

type CustomWalkPayload = {
  userId: string;
  name: string;
  distance: number;
  hasWaterFountain: boolean;
  hasDisabledToilets: boolean;
  hasPark: boolean;
  hasPlayground: boolean;
  hasWellLitStreets: boolean;
  hasRubbishBin: boolean;
  hasOffLeash: boolean;
  hasBbq: boolean;
  selectedFilters: string[];
  routeDistanceMeters?: number;
  routeDurationSeconds?: number;
  routeDistanceText?: string;
  routeDurationText?: string;
  routeGeoJson: string | null;
  fromCommunity: boolean;
  communityWalkId?: string;
  routeId?: string;
};

type CustomWalkResponse = CustomWalkPayload & { id: number };

export type CustomWalk = {
  id: number;
  cuswalkname: string;
  distance: number;
  hasWaterFountain: boolean;
  hasDisabledToilets: boolean;
  hasPark: boolean;
  hasPlayground: boolean;
  hasWellLitStreets: boolean;
  hasRubbishBin: boolean;
  hasOffLeash: boolean;
  hasBbq?: boolean;
  selectedFilters?: string[];
  routeDistanceMeters?: number;
  routeDurationSeconds?: number;
  routeDistanceText?: string;
  routeDurationText?: string;
  routeGeoJson?: any;
  fromCommunity?: boolean;
  communityWalkId?: string;
  routeId?: string;
};

function toCustomWalk(r: CustomWalkResponse): CustomWalk {
  return {
    id: r.id,
    cuswalkname: r.name,
    distance: r.distance,
    hasWaterFountain: r.hasWaterFountain,
    hasDisabledToilets: r.hasDisabledToilets,
    hasPark: r.hasPark,
    hasPlayground: r.hasPlayground,
    hasWellLitStreets: r.hasWellLitStreets,
    hasRubbishBin: r.hasRubbishBin,
    hasOffLeash: r.hasOffLeash,
    hasBbq: r.hasBbq,
    selectedFilters: r.selectedFilters ?? [],
    routeDistanceMeters: r.routeDistanceMeters,
    routeDurationSeconds: r.routeDurationSeconds,
    routeDistanceText: r.routeDistanceText,
    routeDurationText: r.routeDurationText,
    routeGeoJson: r.routeGeoJson ? JSON.parse(r.routeGeoJson) : undefined,
    fromCommunity: r.fromCommunity,
    communityWalkId: r.communityWalkId ?? undefined,
    routeId: r.routeId ?? undefined,
  };
}

function toPayload(walk: Omit<CustomWalk, 'id'>, userId: string): CustomWalkPayload {
  return {
    userId,
    name: walk.cuswalkname,
    distance: walk.distance,
    hasWaterFountain: walk.hasWaterFountain,
    hasDisabledToilets: walk.hasDisabledToilets,
    hasPark: walk.hasPark,
    hasPlayground: walk.hasPlayground,
    hasWellLitStreets: walk.hasWellLitStreets,
    hasRubbishBin: walk.hasRubbishBin,
    hasOffLeash: walk.hasOffLeash,
    hasBbq: Boolean(walk.hasBbq),
    selectedFilters: walk.selectedFilters ?? [],
    routeDistanceMeters: walk.routeDistanceMeters,
    routeDurationSeconds: walk.routeDurationSeconds,
    routeDistanceText: walk.routeDistanceText,
    routeDurationText: walk.routeDurationText,
    routeGeoJson: walk.routeGeoJson
      ? (typeof walk.routeGeoJson === 'string' ? walk.routeGeoJson : JSON.stringify(walk.routeGeoJson))
      : null,
    fromCommunity: Boolean(walk.fromCommunity),
    communityWalkId: walk.communityWalkId,
    routeId: walk.routeId,
  };
}

export async function fetchCustomWalks(): Promise<CustomWalk[]> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks?userId=${encodeURIComponent(await getUserId())}`);
  const data: CustomWalkResponse[] = await res.json();
  return data.map(toCustomWalk);
}

export async function createCustomWalk(walk: Omit<CustomWalk, 'id'>): Promise<CustomWalk> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toPayload(walk, await getUserId())),
  });
  const data: CustomWalkResponse = await res.json();
  return toCustomWalk(data);
}

export async function updateCustomWalk(id: number, walk: Omit<CustomWalk, 'id'>): Promise<CustomWalk> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toPayload(walk, await getUserId())),
  });
  const data: CustomWalkResponse = await res.json();
  return toCustomWalk(data);
}

export async function deleteCustomWalk(id: number): Promise<void> {
  await fetch(`${BASE_URL}/api/CustomWalks/${id}`, { method: 'DELETE' });
}
