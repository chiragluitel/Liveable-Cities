import {
  SelectedWalkData,
  SelectedWalkVariant,
} from "@Types/TypesForSelectedWalk";

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
    nearbyList: [
      {
        id: "public-toilets",
        label: "Public Toilets",
        placeType: "public-toilets",
      },
      {
        id: "parks",
        label: "Parks",
        placeType: "park",
      },
      {
        id: "rest-areas",
        label: "Rest Areas",
        placeType: "rest-area",
      },
    ],
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
    nearbyList: [
      {
        id: "public-toilets",
        label: "Public Toilets",
        placeType: "public-toilets",
      },
      {
        id: "parks",
        label: "Parks",
        placeType: "park",
      },
      {
        id: "rest-areas",
        label: "Rest Areas",
        placeType: "rest-area",
      },
    ],
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