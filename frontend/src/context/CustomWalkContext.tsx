import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '@/src/api/apiConfig';

const CustomWalkContext = createContext<any>(null);

// hook to allow other screens to access custom walks
export const useCustomWalks = () => useContext(CustomWalkContext);

export const CustomWalkProvider = ({ children }: { children: React.ReactNode }) => {
  // The master Array storing all saved walk objects
  const [walks, setWalks] = useState<any[]>([]);

  // Load persisted walks from the database on mount
  const loadWalksFromDatabase = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/custom-walks`);
      if (response.ok) {
        const dbWalks = await response.json();
        if (Array.isArray(dbWalks) && dbWalks.length > 0) {
          const mappedWalks = dbWalks.map((w: any) => ({
            id: w.id,
            cuswalkname: w.title,
            distance: w.distance,
            hasWaterFountain: w.hasWaterFountain,
            hasDisabledToilets: w.hasDisabledToilets,
            hasPark: w.hasPark,
            hasPlayground: w.hasPlayground,
            hasWellLitStreets: w.hasWellLitStreets,
            hasRubbishBin: w.hasRubbishBin,
            hasOffLeash: w.hasOffLeash,
            hasBbq: w.hasBbq,
            selectedFilters: w.selectedFilters ?? [],
            routeDistanceMeters: w.routeDistanceMeters,
            routeDurationSeconds: w.routeDurationSeconds,
            routeDistanceText: w.routeDistanceText,
            routeDurationText: w.routeDurationText,
            routeGeoJson: w.routeGeoJson ? (typeof w.routeGeoJson === 'string' ? JSON.parse(w.routeGeoJson) : w.routeGeoJson) : undefined,
          }));

          setWalks(mappedWalks);
        }
      }
    } catch (error) {
      // Backend is offline or not reachable; continue using local in-memory walks
      console.warn('Could not load custom walks from backend database:', error);
    }
  }, []);

  useEffect(() => {
    loadWalksFromDatabase();
  }, [loadWalksFromDatabase]);

  const saveWalk = async (newWalk: any) => {
    const walkId = newWalk.id || Date.now().toString();
    const walkToSave = { ...newWalk, id: walkId };

    // Optimistic UI update
    setWalks((currentWalks) => {
      if (newWalk.id) {
        return currentWalks.map((w) => (w.id === newWalk.id ? walkToSave : w));
      }
      return [...currentWalks, walkToSave];
    });

    // Persist to backend database
    try {
      const payload = {
        id: walkId,
        title: walkToSave.cuswalkname || 'Custom Walk',
        distance: Number(walkToSave.distance) || 1,
        hasWaterFountain: Boolean(walkToSave.hasWaterFountain),
        hasDisabledToilets: Boolean(walkToSave.hasDisabledToilets),
        hasPark: Boolean(walkToSave.hasPark),
        hasPlayground: Boolean(walkToSave.hasPlayground),
        hasWellLitStreets: Boolean(walkToSave.hasWellLitStreets),
        hasRubbishBin: Boolean(walkToSave.hasRubbishBin ?? walkToSave.hasRubbishbin),
        hasOffLeash: Boolean(walkToSave.hasOffLeash),
        hasBbq: Boolean(walkToSave.hasBbq),
        selectedFilters: walkToSave.selectedFilters ?? [],
        routeDistanceMeters: walkToSave.routeDistanceMeters,
        routeDurationSeconds: walkToSave.routeDurationSeconds,
        routeDistanceText: walkToSave.routeDistanceText,
        routeDurationText: walkToSave.routeDurationText,
        routeGeoJson: walkToSave.routeGeoJson
          ? (typeof walkToSave.routeGeoJson === 'string' ? walkToSave.routeGeoJson : JSON.stringify(walkToSave.routeGeoJson))
          : null,
      };

      await fetch(`${API_BASE_URL}/api/custom-walks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('Could not persist custom walk to backend database:', error);
    }
  };

  const deleteWalk = async (id: string) => {
    // Optimistic UI update
    setWalks((currentWalks) => currentWalks.filter((w) => w.id !== id));

    // Persist delete to backend database
    try {
      await fetch(`${API_BASE_URL}/api/custom-walks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.warn('Could not delete custom walk from backend database:', error);
    }
  };

  return (
    <CustomWalkContext.Provider value={{ walks, saveWalk, deleteWalk, refreshWalks: loadWalksFromDatabase }}>
      {children}
    </CustomWalkContext.Provider>
  );
};
