import { createContext, useContext } from 'react';

export type MemoryContextType = {
  checkedInUsers: CheckedInUser[];
  setCheckedInUsers: SetCheckedInUsers;
};

export const MemoryContext = createContext<MemoryContextType>({
  checkedInUsers: [],
  setCheckedInUsers: () => {},
});

export const useMemory = () => useContext(MemoryContext);
