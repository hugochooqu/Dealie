// store/personaStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Persona {
  id: string;
  name: string;
  description: string;
  preview: string;
  strategy: string;
    tone: string;
    vendor_id: string | null;
}

interface PersonaState {
  selectedPersona: Persona | null;
  selectedChannel: string;
  personas: Persona[];
  setSelectedPersona: (persona: Persona) => void;
  setSelectedChannel: (channel: string) => void;
  setPersonas: (personas: Persona[]) => void;
}

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set) => ({
      selectedPersona: null,
      selectedChannel: "global",
      personas: [],
      setSelectedPersona: (persona) => set({ selectedPersona: persona }),
      setSelectedChannel: (channel) => set({ selectedChannel: channel }),
      setPersonas: (personas) => set({ personas }),
    }),
    {
      name: "persona-storage", // persisted in localStorage
    }
  )
);
