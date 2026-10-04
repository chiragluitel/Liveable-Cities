import { createContext, useState, useContext, useEffect } from 'react';
import {
  fetchCustomWalks,
  createCustomWalk,
  updateCustomWalk,
  deleteCustomWalk,
  CustomWalk,
} from '../api/customWalks';

const CustomWalkContext = createContext<any>(null);

export const useCustomWalks = () => useContext(CustomWalkContext);

export const CustomWalkProvider = ({ children }: { children: React.ReactNode }) => {
  const [walks, setWalks] = useState<CustomWalk[]>([]);

  useEffect(() => {
    fetchCustomWalks().then(setWalks).catch(console.error);
  }, []);

  const saveWalk = async (newWalk: any) => {
    if (newWalk.id) {
      const id = typeof newWalk.id === 'string' ? Number(newWalk.id) : newWalk.id;
      const updated = await updateCustomWalk(id, newWalk);
      setWalks(current => current.map(w => w.id === updated.id ? updated : w));
    } else {
      const created = await createCustomWalk(newWalk);
      setWalks(current => [...current, created]);
    }
  };

  const deleteWalk = async (id: number | string) => {
    const numId = typeof id === 'string' ? Number(id) : id;
    await deleteCustomWalk(numId);
    setWalks(current => current.filter(w => w.id !== numId));
  };

  return (
    <CustomWalkContext.Provider value={{ walks, saveWalk, deleteWalk }}>
      {children}
    </CustomWalkContext.Provider>
  );
};
