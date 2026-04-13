import react, { createContext, useState, useContext } from 'react';

const SavedCustomWalks = createContext<any>(null);

//hook to allow other screens to access custom walks
export const useWalks = () => useContext(SavedCustomWalks);

export const WalkProvider = ({ children }: { children: React.ReactNode }) => {
  // The master Array storing all saved walk objects
  const [walks, setWalks] = useState<any[]>([]);

  const saveWalk = (newWalk: any) => {
    setWalks((currentWalks) => {
      // If the incoming walk object already has a unique ID, overwrite the existing entry (Edit Mode)
      if (newWalk.id) {
        return currentWalks.map((w) => (w.id === newWalk.id ? newWalk : w));
      }
      // Otherwise, append it as a completely new entry with a timestamp-based ID (Create Mode)
      return [...currentWalks, { ...newWalk, id: Date.now().toString() }];
    });
  };

  const deleteWalk = (id: string) => {
    setWalks((currentWalks) => currentWalks.filter ((w) => w.id !== id))
  };

  return (
    <SavedCustomWalks.Provider value={{ walks, saveWalk, deleteWalk }}>
        {children}
    </SavedCustomWalks.Provider>
  );
}

export const SavedCustomWalksProvider = WalkProvider;