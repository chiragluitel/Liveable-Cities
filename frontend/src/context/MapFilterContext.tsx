import React, { createContext, useContext, useState } from 'react';
import { IconName, ICON_DEFINITIONS } from '@/src/components/Map/config/mapIcons';
import { DEFAULT_VISIBLE_ICONS } from '@/src/components/Map/config/mapConfig';

type IconVisibility = Record<IconName, boolean>;

interface MapFilterContextValue {
  visibleIcons: IconVisibility;
  setIconVisible: (name: IconName, visible: boolean) => void;
}

function buildDefaultVisibility(): IconVisibility {
  const initial = {} as IconVisibility;
  (Object.keys(ICON_DEFINITIONS) as IconName[]).forEach(name => {
    initial[name] = DEFAULT_VISIBLE_ICONS.includes(name);
  });
  return initial;
}

const MapFilterContext = createContext<MapFilterContextValue>({
  visibleIcons: buildDefaultVisibility(),
  setIconVisible: () => {},
});

// shared between the map's FilterButton and anything else that needs hidden icon types
export const useMapFilter = () => useContext(MapFilterContext);

export const MapFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [visibleIcons, setVisibleIcons] = useState<IconVisibility>(buildDefaultVisibility());

  const setIconVisible = (name: IconName, visible: boolean) => {
    setVisibleIcons(prev => ({ ...prev, [name]: visible }));
  };

  return (
    <MapFilterContext.Provider value={{ visibleIcons, setIconVisible }}>
      {children}
    </MapFilterContext.Provider>
  );
};
