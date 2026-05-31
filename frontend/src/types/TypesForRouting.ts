export type RouteCoordinate = {
  lat: number;
  lng: number;
};

export type CustomWalkRouteRequest = {
  walkId?: string;
  title: string;
  targetDistanceKm: number;
  selectedFilters: string[];
  startLocation?: RouteCoordinate;
};

export type CustomWalkRouteResult = {
  provider: "openrouteservice" | "backend" | "fallback";
  title: string;
  distanceText: string;
  durationText: string;
  selectedFilters: string[];
  routePoints: RouteCoordinate[];
};

export type OpenRouteServiceGeoJsonResponse = {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number][];
    };
    properties?: {
      summary?: {
        distance?: number;
        duration?: number;
      };
    };
  }[];
};