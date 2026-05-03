export type SelectedWalkVariant = "default" | "custom";

export type NearbyPlaceType = "public-toilets" | "park" | "rest-area";

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
  nearbyList: NearbyPlace[];
};