const BASE_URL = 'http://10.0.2.2:5156';
const GABRIEL_USER_ID = 'gabriel-savannah';

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
  };
}

function toPayload(walk: Omit<CustomWalk, 'id'>): CustomWalkPayload {
  return {
    userId: GABRIEL_USER_ID,
    name: walk.cuswalkname,
    distance: walk.distance,
    hasWaterFountain: walk.hasWaterFountain,
    hasDisabledToilets: walk.hasDisabledToilets,
    hasPark: walk.hasPark,
    hasPlayground: walk.hasPlayground,
    hasWellLitStreets: walk.hasWellLitStreets,
    hasRubbishBin: walk.hasRubbishBin,
    hasOffLeash: walk.hasOffLeash,
  };
}

export async function fetchCustomWalks(): Promise<CustomWalk[]> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks?userId=${GABRIEL_USER_ID}`);
  const data: CustomWalkResponse[] = await res.json();
  return data.map(toCustomWalk);
}

export async function createCustomWalk(walk: Omit<CustomWalk, 'id'>): Promise<CustomWalk> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toPayload(walk)),
  });
  const data: CustomWalkResponse = await res.json();
  return toCustomWalk(data);
}

export async function updateCustomWalk(id: number, walk: Omit<CustomWalk, 'id'>): Promise<CustomWalk> {
  const res = await fetch(`${BASE_URL}/api/CustomWalks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toPayload(walk)),
  });
  const data: CustomWalkResponse = await res.json();
  return toCustomWalk(data);
}

export async function deleteCustomWalk(id: number): Promise<void> {
  await fetch(`${BASE_URL}/api/CustomWalks/${id}`, { method: 'DELETE' });
}
