import {
  CustomWalkRouteRequest,
  CustomWalkRouteResult,
  OpenRouteServiceGeoJsonResponse,
  RouteCoordinate,
} from "../types/TypesForRouting";

/*
  This file is the middle routing layer for OpenRouteService.

  Important:
  We are not putting the OpenRouteService API key directly in the frontend.
  Later, the backend should call OpenRouteService securely and return the result here.

  For now, ROUTING_BACKEND_ENDPOINT is empty, so this file safely returns fallback route data.
  When the backend endpoint is ready, we only need to update this value.
*/

const ROUTING_BACKEND_ENDPOINT = "";

const CASEY_FALLBACK_START: RouteCoordinate = {
  lat: -38.0267,
  lng: 145.294,
};

const buildFallbackRoutePoints = (
  startLocation?: RouteCoordinate
): RouteCoordinate[] => {
  const start = startLocation || CASEY_FALLBACK_START;

  return [
    start,
    { lat: start.lat + 0.002, lng: start.lng + 0.003 },
    { lat: start.lat - 0.001, lng: start.lng + 0.005 },
    { lat: start.lat - 0.003, lng: start.lng + 0.001 },
    start,
  ];
};

const formatDistanceText = (distanceInMetres?: number, fallbackKm?: number) => {
  if (distanceInMetres && distanceInMetres > 0) {
    return `${(distanceInMetres / 1000).toFixed(1)} km`;
  }

  if (fallbackKm && fallbackKm > 0) {
    return `${fallbackKm} km`;
  }

  return "3.8 km";
};

const formatDurationText = (durationInSeconds?: number, fallbackKm?: number) => {
  if (durationInSeconds && durationInSeconds > 0) {
    return `${Math.round(durationInSeconds / 60)} mins`;
  }

  if (fallbackKm && fallbackKm > 0) {
    return `${Math.round(fallbackKm * 12)} mins`;
  }

  return "40 mins";
};

export const buildOpenRouteServicePayload = (
  start: RouteCoordinate,
  end: RouteCoordinate
) => {
  return {
    coordinates: [
      [start.lng, start.lat],
      [end.lng, end.lat],
    ],
    instructions: false,
    geometry_simplify: false,
  };
};

export const convertOpenRouteServiceGeoJsonToRouteResult = (
  response: OpenRouteServiceGeoJsonResponse,
  request: CustomWalkRouteRequest
): CustomWalkRouteResult => {
  const firstFeature = response.features?.[0];

  if (!firstFeature) {
    return buildFallbackRouteResult(request);
  }

  const routePoints = firstFeature.geometry.coordinates.map(([lng, lat]) => ({
    lat,
    lng,
  }));

  const summary = firstFeature.properties?.summary;

  return {
    provider: "openrouteservice",
    title: request.title,
    distanceText: formatDistanceText(
      summary?.distance,
      request.targetDistanceKm
    ),
    durationText: formatDurationText(
      summary?.duration,
      request.targetDistanceKm
    ),
    selectedFilters: request.selectedFilters,
    routePoints,
  };
};

export const buildFallbackRouteResult = (
  request: CustomWalkRouteRequest
): CustomWalkRouteResult => {
  return {
    provider: "fallback",
    title: request.title,
    distanceText: formatDistanceText(undefined, request.targetDistanceKm),
    durationText: formatDurationText(undefined, request.targetDistanceKm),
    selectedFilters: request.selectedFilters,
    routePoints: buildFallbackRoutePoints(request.startLocation),
  };
};

export const generateCustomWalkRoute = async (
  request: CustomWalkRouteRequest
): Promise<CustomWalkRouteResult> => {
  if (!ROUTING_BACKEND_ENDPOINT) {
    return buildFallbackRouteResult(request);
  }

  try {
    const response = await fetch(ROUTING_BACKEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Routing backend request failed");
    }

    const data = await response.json();

    if (data?.features) {
      return convertOpenRouteServiceGeoJsonToRouteResult(data, request);
    }

    return {
      provider: "backend",
      title: data.title || request.title,
      distanceText: data.distanceText || formatDistanceText(undefined, request.targetDistanceKm),
      durationText: data.durationText || formatDurationText(undefined, request.targetDistanceKm),
      selectedFilters: data.selectedFilters || request.selectedFilters,
      routePoints: data.routePoints || buildFallbackRoutePoints(request.startLocation),
    };
  } catch (error) {
    console.log("Route generation failed, using fallback route:", error);
    return buildFallbackRouteResult(request);
  }
};