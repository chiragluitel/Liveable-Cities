export type SelectedWalkVariant = "default" | "custom";

export type NearbyPlaceType = "bbq" | "library" | "bench" | "toilet";

export type NearbyPlace = {
  id: string;
  label: string;
  placeType: NearbyPlaceType;
};

export type SelectedWalkData = {
  screenTitle: string;
  title: string;
  distanceText: string;
  durationText: string;
  showImages: boolean;
  infoTitle: string;
  infoText: string;
  selectedFilters?: string[];
  nearbyList: NearbyPlace[];
};