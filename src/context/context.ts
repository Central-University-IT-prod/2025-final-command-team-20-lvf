import { createContext, useContext, useMemo } from "react";
import { NoteType } from "../types";

export interface Global {
  notes: NoteType[];
}

export type ReactState<K> = {
  value: K,
  setter: React.Dispatch<React.SetStateAction<K>>
};

export type GlobalState = ReactState<Global>;
export const GlobalContext = createContext<GlobalState>({} as GlobalState);

export const useUpdateGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error('useUpdateGlobal must be used within a GlobalContext');
  }
  const { value, setter } = ctx;
  return useMemo(() => {
    return function(updater: (state: Global) => Global) {
      const newGlobal = updater(value);
      console.log('newGlobal', newGlobal);
      setter(newGlobal);
    }
  }, [value, setter]);
}

export const useAddNote = () => {
  const updateGlobal = useUpdateGlobal();
  return (note: NoteType) => updateGlobal(state => ({ ...state, notes: [...state.notes, note] }));
}

export const useDeleteNote = () => {
  const updateGlobal = useUpdateGlobal();
  return (id: number) => updateGlobal(state => ({ ...state, notes: state.notes.filter(note => note.id !== id) }));
}

export const useUpdateNote = () => {
  const updateGlobal = useUpdateGlobal();
  return (note: NoteType) => updateGlobal(state => ({ ...state, notes: state.notes.map(n => n.id === note.id ? note : n) }));
}

export const useInsertFetchedNotes = () => {
  const updateGlobal = useUpdateGlobal();
  return (notes: NoteType[]) => updateGlobal(state => ({ ...state, notes }));
}
