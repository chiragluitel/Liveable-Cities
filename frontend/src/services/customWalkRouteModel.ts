import {
  CustomWalkRouteRequest,
  RouteCoordinate,
} from "../types/TypesForRouting";

export type SavedCustomWalkForRouting = {
  id?: string;
  cuswalkname?: string;
  distance?: string | number;
  hasWaterFountain?: boolean;
  hasDisabledToilets?: boolean;
  hasPark?: boolean;
  hasPlayground?: boolean;
  hasRubbishBin?: boolean;
  hasOffLeash?: boolean;
  hasWellLitStreets?: boolean;
};

export const getSelectedFiltersFromSavedWalk = (
  walk: SavedCustomWalkForRouting
): string[] => {
  const selectedFilters: string[] = [];

  if (walk.hasWaterFountain) selectedFilters.push("Water Fountain");
  if (walk.hasDisabledToilets) selectedFilters.push("Disabled Toilets");
  if (walk.hasPark) selectedFilters.push("Park");
  if (walk.hasPlayground) selectedFilters.push("Playground");
  if (walk.hasRubbishBin) selectedFilters.push("Rubbish Bins");
  if (walk.hasOffLeash) selectedFilters.push("Off Leash Zones");
  if (walk.hasWellLitStreets) selectedFilters.push("Well Lit Streets");

  return selectedFilters;
};

export const buildCustomWalkRouteRequest = (
  walk: SavedCustomWalkForRouting,
  startLocation?: RouteCoordinate
): CustomWalkRouteRequest => {
  const distanceNumber = Number(walk.distance);

  return {
    walkId: walk.id,
    title: walk.cuswalkname?.trim() || "Custom Walk",
    targetDistanceKm:
      distanceNumber && !Number.isNaN(distanceNumber) ? distanceNumber : 3,
    selectedFilters: getSelectedFiltersFromSavedWalk(walk),
    startLocation,
  };
};