import React, { createContext, useState, useContext } from 'react';
import { COMMUNITY_WALKS } from '@/src/database/mockData';
import { Walk } from '@/src/types/walkPlannerTypes';

const CommunityWalksContext = createContext<any>(null);

// hook to allow other screens to access community walks
export const useCommunityWalks = () => useContext(CommunityWalksContext);

export const CommunityWalksProvider = ({ children }: { children: React.ReactNode }) => {
  // in-memory only — seeded from mock data, resets on app restart
  const [communityWalks, setCommunityWalks] = useState<Walk[]>(COMMUNITY_WALKS);

  // converts a locally-built walk into a community Walk entry and adds it to the shared list
  const shareWalk = (localWalk: any, sharedBy?: string) => {
    const activeTags = [
      localWalk.hasWaterFountain && 'Water Fountain',
      localWalk.hasDisabledToilets && 'Accessible',
      localWalk.hasPark && 'Park',
      localWalk.hasPlayground && 'Playground',
      localWalk.hasWellLitStreets && 'Lit Streets',
      localWalk.hasRubbishBin && 'Bins',
      localWalk.hasOffLeash && 'Off Leash',
    ].filter(Boolean) as string[];

    const distanceKm = Number(localWalk.distance) || 0;

    const shared: Walk = {
      id: `cw-${Date.now()}`,
      title: localWalk.cuswalkname || 'Custom Walk',
      subtitle: sharedBy ? `Shared by ${sharedBy}` : 'Shared by a community member',
      distanceKm,
      durationMin: Math.round((distanceKm / 4) * 60), // assumes an average 4km/h pace
      difficulty: 'Easy',
      tags: activeTags.length ? activeTags : ['Community'],
      thumbnailColor: '#C8E6C9',
      downloads: 0,
    };

    setCommunityWalks((current) => [shared, ...current]);
    return shared;
  };

  const getCommunityWalk = (id: string) => communityWalks.find((w: Walk) => w.id === id);

  // Bumps the fake download counter when someone imports a walk into "My Walks".
  const incrementDownloads = (id: string) => {
    setCommunityWalks((current) =>
      current.map((w) => (w.id === id ? { ...w, downloads: (w.downloads ?? 0) + 1 } : w))
    );
  };

  return (
    <CommunityWalksContext.Provider value={{ communityWalks, shareWalk, getCommunityWalk, incrementDownloads }}>
      {children}
    </CommunityWalksContext.Provider>
  );
};
