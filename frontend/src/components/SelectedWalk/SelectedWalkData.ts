import {
  SelectedWalkData,
  SelectedWalkVariant,
} from "../../types/TypesForSelectedWalk";

export const getSelectedWalkData = (
  variant: SelectedWalkVariant,
  titleOverride?: string
): SelectedWalkData => {
  if (variant === "custom") {
    return {
      backLabel: "Create a Custom Walk",
      screenTitle: "Your Custom Walk",
      title: titleOverride?.trim() || "Custom Walk",
      distanceText: "3.8 km",
      durationText: "40 mins",
      showImages: false,
      infoTitle: "Route Summary",
      infoText:
        "This route was generated based on your selected walking preferences.",
      nearby: [
        {
          id: "public-toilets",
          label: "Public Toilets",
          iconFamily: "MaterialIcons",
          iconType: "wc",
          bgColor: "#9b94f1",
        },
        {
          id: "parks",
          label: "Parks",
          iconFamily: "Ionicons",
          iconType: "leaf-outline",
          bgColor: "#19c58a",
        },
        {
          id: "rest-areas",
          label: "Rest Areas",
          iconFamily: "MaterialIcons",
          iconType: "event-seat",
          bgColor: "#b8c0b7",
        },
      ],
    };
  }

  return {
    backLabel: "Back",
    screenTitle: "Walk Selected",
    title: titleOverride?.trim() || "Selected Walk",
    distanceText: "3.8 km",
    durationText: "40 mins",
    showImages: true,
    infoTitle: "About",
    infoText:
      "A calm scenic walk with paved paths, shaded areas, and nearby community facilities.",
    nearby: [
      {
        id: "public-toilets",
        label: "Public Toilets",
        iconFamily: "MaterialIcons",
        iconType: "wc",
        bgColor: "#9b94f1",
      },
      {
        id: "parks",
        label: "Parks",
        iconFamily: "Ionicons",
        iconType: "leaf-outline",
        bgColor: "#19c58a",
      },
      {
        id: "rest-areas",
        label: "Rest Areas",
        iconFamily: "MaterialIcons",
        iconType: "event-seat",
        bgColor: "#b8c0b7",
      },
    ],
  };
};