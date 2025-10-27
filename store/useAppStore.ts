import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  sku?: string;
  floorPrice?: number;
  ceilingPrice?: number;
  floor_price?: number;
  ceiling_price?: number;
  status?: string;
}

interface Persona {
  id: number;
  name: string;
  description?: string;
  role?: string;
}

interface AppState {
  token: string | null;
  products: Product[];
  personas: Persona[];
  setToken: (token: string | null) => void;
  setProducts: (products: Product[]) => void;
  setPersonas: (personas: Persona[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      products: [],
      personas: [],
      setToken: (token) => set({ token }),
      setProducts: (products) => set({ products }),
      setPersonas: (personas) => set({ personas }),
    }),
    {
      name: "app-storage", // persists in localStorage
    }
  )
);
