import React, { createContext, useContext } from 'react';
import useAsyncStorage from '@Hooks/useAsyncStorage';

export type WalkingSpeed = 'Slow' | 'Average' | 'Fast';

export const SPEED_KMH: Record<WalkingSpeed, number> = {
  Slow: 2,
  Average: 4,
  Fast: 6,
};

export function formatWalkTime(distanceKm: number, speed: WalkingSpeed): string {
  const totalMinutes = Math.round((distanceKm / SPEED_KMH[speed]) * 60);
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

interface SettingsContextValue {
  walkingSpeed: WalkingSpeed;
  setWalkingSpeed: (speed: WalkingSpeed) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  walkingSpeed: 'Average',
  setWalkingSpeed: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [walkingSpeed, setWalkingSpeed] = useAsyncStorage('WalkingSpeed', 'Average');

  return (
    <SettingsContext.Provider value={{ walkingSpeed: walkingSpeed as WalkingSpeed, setWalkingSpeed }}>
      {children}
    </SettingsContext.Provider>
  );
};
