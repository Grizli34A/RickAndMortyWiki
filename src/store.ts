import { create } from "zustand";
import { Gender, Status, Species } from "./app.types";

interface IOrigin {
  name: string;
  url: string;
}

export interface ICharacter {
  id: number;
  created: Date;
  name: string;
  gender: Gender;
  status: Status;
  type: string;
  image: string;
  species: Species;
  origin: IOrigin;
  location?: string;
  episode?: string[];
}

interface ICharacterInfo {
  nextCharaters: string | null;
  prevCharacters: string | null;
  currentPage: number;
  pageCount: number;
  characters: ICharacter[] | [];
  setPageCount: (count: number) => void;
  getCharacters: (characters: ICharacter[]) => void;
  resetCharacters: () => void;
  changePath: (nextSet: boolean) => void;
  resetCurrentPage: () => void;
}
export const useCharacterStore = create<ICharacterInfo>((set, get) => ({
  nextCharaters: process.env.REACT_APP_API_URL + "/character?page=2",
  prevCharacters: null,
  currentPage: 1,
  pageCount: 42,
  characters: [],
  setPageCount: (count: number) => {
    if (count === 1) set(() => ({ nextCharaters: null }));
    set(() => ({ pageCount: count }));
  },
  getCharacters: (characters: ICharacter[]) => {
    set(() => ({ characters: characters }));
  },
  resetCharacters: () => {
    set(() => ({ characters: [] }));
  },
  changePath: (nextSet: boolean) => {
    if (get().currentPage < get().pageCount && nextSet) {
      set(() => ({
        currentPage: get().currentPage + 1,
        prevCharacters: get().nextCharaters,
        nextCharaters:
          get().nextCharaters?.slice(0, -1) + `${get().currentPage + 1}`,
      }));
    } else if (get().currentPage >= 2 && !nextSet) {
      set(() => ({
        currentPage: get().currentPage - 1,
        prevCharacters:
          get().prevCharacters?.slice(0, -1) + `${get().currentPage - 1}`,
        nextCharaters: get().prevCharacters,
      }));
    }
    if (get().currentPage === 1) {
      set(() => ({
        prevCharacters: null,
      }));
    } else if (get().currentPage === get().pageCount) {
      set(() => ({
        nextCharaters: null,
      }));
    }
  },
  resetCurrentPage: () => {
    set(() => ({
      currentPage: 1,
      nextCharaters: process.env.REACT_APP_API_URL + "/character?page=2",
      prevCharacters: null,
    }));
  },
}));

interface ISearch {
  name: string;
  setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearchStore = create<ISearch>((set) => ({
  name: "",
  setName: (event) => {
    set(() => ({ name: event.target.value }));
  },
}));

interface IFilter {
  currentGender: Gender | "";
  currentSpecies: string;
  currentStatus: Status | "";
  genders: Gender[];
  specieses: Species[];
  statuses: Status[];
  initialActiveButtons: ["", "", ""];
  activeButtons: [Status | "", Gender | "", Species | ""];
  filterOpened: boolean[];
  setGender: (gender: Gender | "") => void;
  setSpecies: (species: Species | "") => void;
  setStatus: (status: Status | "") => void;
  setActiveButtons: (index: number, type: Gender | Species | Status) => void;
  setFilterOpened: (index: number) => void;
  resetActiveButtons: () => void;
}

export const useFilterStore = create<IFilter>((set, get) => ({
  currentGender: "",
  currentSpecies: "",
  currentStatus: "",
  genders: ["Male", "Female", "Genderless", "unknown"],
  specieses: [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ],
  statuses: ["Alive", "Dead", "unknown"],

  initialActiveButtons: ["", "", ""],
  activeButtons: ["", "", ""],

  filterOpened: [false, false, false],

  setStatus: (status: Status | "") => {
    if (get().currentStatus === status) {
      set(() => ({
        currentStatus: "",
      }));
    } else {
      set(() => ({
        currentStatus: status,
      }));
    }
  },
  setGender: (gender: Gender | "") => {
    if (get().currentGender === gender) {
      set(() => ({
        currentGender: "",
      }));
    } else {
      set(() => ({
        currentGender: gender,
      }));
    }
  },
  setSpecies: (species: Species | "") => {
    if (get().currentSpecies === species) {
      set(() => ({
        currentSpecies: "",
      }));
    } else {
      set(() => ({
        currentSpecies: species,
      }));
    }
  },
  setActiveButtons: (index: number, type: Gender | Species | Status) => {
    const currentButtons = get().activeButtons;

    if (!currentButtons[index]) currentButtons[index] = type;
    else if (currentButtons[index] === type) currentButtons[index] = "";
    else currentButtons[index] = type;
    set(() => ({
      activeButtons: currentButtons,
    }));
  },
  resetActiveButtons: () => {
    set(() => ({
      activeButtons: [...get().initialActiveButtons],
    }));
  },

  setFilterOpened: (index: number) => {
    const currentFilters = [...get().filterOpened];
    currentFilters[index] = !currentFilters[index];
    set(() => ({
      filterOpened: currentFilters,
    }));
  },
}));

interface IFetchRequest {
  fetchSuccess: boolean;
  setFetchSuccess: (success: boolean) => void;
}

export const useFetchRequest = create<IFetchRequest>((set) => ({
  fetchSuccess: true,
  setFetchSuccess: (success: boolean) => set(() => ({ fetchSuccess: success })),
}));

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface ISelect {
  currentLocation: ILocation | "";
  locations: ILocation[];
  setCurrentLocation: (location: ILocation | "") => void;
  setLocations: (locations: ILocation[]) => void;
}

export const useLocationStore = create<ISelect>((set) => ({
  currentLocation: "",
  locations: [],
  setCurrentLocation: (location: ILocation | "") => {
    set(() => ({ currentLocation: location }));
  },
  setLocations: (locations: ILocation[]) => {
    set(() => ({ locations }));
  },
}));

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string; //нужна ли инфа или нет номер сезона и серии
  characters: string[];
}

interface ISelectEpisode {
  currentEpisode: IEpisode | "";
  episodes: IEpisode[];
  setCurrentEpisode: (episode: IEpisode | "") => void;
  setEpisodes: (episode: IEpisode[]) => void;
}

export const useEpisodeStore = create<ISelectEpisode>((set) => ({
  currentEpisode: "",
  episodes: [],
  setCurrentEpisode: (episode: IEpisode | "") => {
    set(() => ({ currentEpisode: episode }));
  },
  setEpisodes: (episodes: IEpisode[]) => {
    set(() => ({ episodes }));
  },
}));
