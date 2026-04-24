export type SelectedWalkVariant = "default" | "custom";

export type NearbyPlace = {
  id: string;
  label: string;
  iconType: "wc" | "leaf-outline" | "event-seat";
  iconFamily: "MaterialIcons" | "Ionicons";
  bgColor: string;
};

export type SelectedWalkData = {
  backLabel: string;
  screenTitle: string;
  title: string;
  distanceText: string;
  durationText: string;
  showImages: boolean;
  infoTitle: string;
  infoText: string;
  nearby: NearbyPlace[];
};