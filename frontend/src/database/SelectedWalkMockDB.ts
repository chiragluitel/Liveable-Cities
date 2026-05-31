import {
  SelectedWalkData,
  SelectedWalkVariant,
} from "@Types/TypesForSelectedWalk";

type SelectedWalkOverrides = {
  titleOverride?: string;
  distanceOverride?: string;
  selectedFiltersOverride?: string[];
};

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

const estimateDurationFromDistance = (distanceText?: string) => {
  const distanceNumber = Number(distanceText);

  if (!distanceNumber || Number.isNaN(distanceNumber)) {
    return "40 mins";
  }

  const estimatedMinutes = Math.round(distanceNumber * 12);
  return `${estimatedMinutes} mins`;
};

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
  overrides?: SelectedWalkOverrides
): SelectedWalkData => {
  const selectedWalkData = selectedWalkMockData[variant];

  const title = overrides?.titleOverride?.trim() || selectedWalkData.title;
  const distanceText = overrides?.distanceOverride
    ? `${overrides.distanceOverride} km`
    : selectedWalkData.distanceText;

  const durationText = overrides?.distanceOverride
    ? estimateDurationFromDistance(overrides.distanceOverride)
    : selectedWalkData.durationText;

  const selectedFilters =
    overrides?.selectedFiltersOverride && overrides.selectedFiltersOverride.length > 0
      ? overrides.selectedFiltersOverride
      : selectedWalkData.selectedFilters;

  return {
    ...selectedWalkData,
    title,
    distanceText,
    durationText,
    selectedFilters,
  };
};