export type MapRoutePoint = {
  lat: number;
  lng: number;
};

export type MapRoute = {
  id: string;
  points: MapRoutePoint[];
};

export const MAP_ROUTES: MapRoute[] = [
  {
    id: 'bbq-walk',
    points: [
      { lat: -37.9962, lng: 145.2952 },
      { lat: -37.9962, lng: 145.2990 },
      { lat: -38.0030, lng: 145.2990 },
      { lat: -38.0030, lng: 145.2914 },
    ],
  },
];
