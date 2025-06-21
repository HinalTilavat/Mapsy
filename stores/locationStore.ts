import { create } from 'zustand';

type Location = {
  name: string;
  address: string;
  lat: string;
  lon: string;
};

type LocationStore = {
  start: Location | null;
  end: Location | null;
  selectedRoute: any | null;
  setStart: (loc: Location) => void;
  setEnd: (loc: Location) => void;
  setSelectedRoute: (route: any) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  start: null,
  end: null,
  selectedRoute: null,
  setStart: (loc) => set({ start: loc }),
  setEnd: (loc) => set({ end: loc }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
}));