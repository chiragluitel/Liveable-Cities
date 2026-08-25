import React, { createContext, useContext, useEffect, useState } from 'react';
import useAsyncStorage from '@Hooks/useAsyncStorage';
import { View } from 'lucide-react-native';
import WeeklyWalksNotif from '../components/WeeklyWalksNotif';

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
  walkGoal: string;
  setWalkGoal: (value: string) => void;
  weeklyWalks: string;
  setWeeklyWalks: (value: string) => void;
  addToWeeklyWalks: () => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  walkingSpeed: 'Average',
  setWalkingSpeed: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
  walkGoal: "5",
  setWalkGoal: () => {},
  weeklyWalks: "0",
  setWeeklyWalks: () => {},
  addToWeeklyWalks: () => {}
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useAsyncStorage("reduceMotion", false);
  const [walkingSpeed, setWalkingSpeed] = useAsyncStorage('walkSpeed', 'Average');
  const [walkGoal, setWalkGoal] = useAsyncStorage("walkGoal", "5");
  const [weeklyWalks, setWeeklyWalks, isWeeklyWalksLoading] = useAsyncStorage("weeklyWalks", "0");

  const [weekStart, setWeekStart, isWeekStartLoading] = useAsyncStorage("weekStart", "");

  useEffect(() => {
    if (isWeekStartLoading) return;

    const today = new Date();
    
    const monday = new Date(today);
    const day = today.getDay();
  
    const daysSinceMon = day === 0 ? 6 : day -1;
  
    monday.setDate(today.getDate() - daysSinceMon);
    const mondayString = monday.toISOString().split("T")[0];
    
    if (weekStart !== mondayString) {
      setWeekStart(mondayString); 
      setWeeklyWalks("0");
    }
  }, [isWeekStartLoading, isWeeklyWalksLoading, weekStart]);

  const [walksUpdateVisible, setWalksUpdateVisible] = useState(false);

  function addToWeeklyWalks() {
    setWeeklyWalks(String(Number(weeklyWalks) + 1));
    setWalksUpdateVisible(true);
  }

  return (
    <SettingsContext.Provider value={{ 
        walkingSpeed: walkingSpeed as WalkingSpeed, 
        setWalkingSpeed, 
        reducedMotion, 
        setReducedMotion, 
        walkGoal, 
        setWalkGoal, 
        weeklyWalks,
        setWeeklyWalks,
        addToWeeklyWalks
      }}>
      {children}

      { walksUpdateVisible && 
        <WeeklyWalksNotif notifType='' currentValue={weeklyWalks} goalValue={walkGoal} onFinish={() => {setWalksUpdateVisible(false)}} />
      }
    </SettingsContext.Provider>
  );
};
