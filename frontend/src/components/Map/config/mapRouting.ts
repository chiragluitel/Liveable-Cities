export type MapRoutePoint = {
  lat: number;
  lng: number;
};

export type MapRoute = {
  id: string;
  title?: string;
  points?: MapRoutePoint[];
  targetDistanceKm?: number;
  selectedFilters?: string[];
  routeGeoJson?: any;
  distanceText?: string;
  durationText?: string;
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
  {
    id: 'marriott-waters-loop',
    points: [
      { lat: -38.073822, lng: 145.250238 },
      { lat: -38.074008, lng: 145.250110 },
      { lat: -38.073822, lng: 145.250238 },
    ],
  },
  {
    id: 'berwick-springs-loop',
    points: [
      { lat: -38.068177, lng: 145.331132 },
      { lat: -38.068177, lng: 145.331132 },
    ],
  },
  {
    id: 'casey-fields-lake-loop',
    points: [
      { lat: -38.120532, lng: 145.313156 },
      { lat: -38.120532, lng: 145.313156 },
    ],
  },
];
