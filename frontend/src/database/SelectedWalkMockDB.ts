import {
  SelectedWalkData,
  SelectedWalkVariant,
} from "@Types/TypesForSelectedWalk";

const nearbyMapPlaces = [
  {
    id: "bbq",
    label: "BBQ",
    placeType: "bbq",
  },
  {
    id: "library",
    label: "Library",
    placeType: "library",
  },
  {
    id: "bench",
    label: "Bench",
    placeType: "bench",
  },
  {
    id: "toilet",
    label: "Toilet",
    placeType: "toilet",
  },
] as const;

const selectedWalkMockData: Record<SelectedWalkVariant, SelectedWalkData> = {
  default: {
    screenTitle: "Walk Selected",
    title: "Selected Walk",
    distanceText: "3.8 km",
    durationText: "40 mins",
    showImages: true,
    infoTitle: "About",
    infoText:
      "A calm scenic walk with paved paths, shaded areas, and nearby community facilities.",
    nearbyList: [...nearbyMapPlaces],
  },

  custom: {
    screenTitle: "Custom Walk",
    title: "Custom Walk",
    distanceText: "3.8 km",
    durationText: "40 mins",
    showImages: false,
    infoTitle: "Route Summary",
    infoText:
      "This route was generated based on your selected walking preferences.",
    selectedFilters: ["Water Fountain", "Park", "Rubbish Bins"],
    nearbyList: [...nearbyMapPlaces],
  },
};

export const getSelectedWalkData = (
  variant: SelectedWalkVariant,
  titleOverride?: string
): SelectedWalkData => {
  const selectedWalkData = selectedWalkMockData[variant];

  return {
    ...selectedWalkData,
    title: titleOverride?.trim() || selectedWalkData.title,
  };
};