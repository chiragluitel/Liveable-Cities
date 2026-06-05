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
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
  distGoal: string;
  setDistGoal: (value: string) => void;
  stepGoal: string;
  setStepGoal: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  walkingSpeed: 'Average',
  setWalkingSpeed: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
  distGoal: "5",
  setDistGoal: () => {},
  stepGoal: "5000",
  setStepGoal: () => {}
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useAsyncStorage("reduceMotion", false);
  const [walkingSpeed, setWalkingSpeed] = useAsyncStorage('walkSpeed', 'Average');
  const [distGoal, setDistGoal] = useAsyncStorage("distGoal", "5");
  const [stepGoal, setStepGoal] = useAsyncStorage("stepGoal", "5000");

  return (
    <SettingsContext.Provider value={{ 
        walkingSpeed: walkingSpeed as WalkingSpeed, 
        setWalkingSpeed, 
        reducedMotion, 
        setReducedMotion, 
        distGoal, 
        setDistGoal, 
        stepGoal, 
        setStepGoal 
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
