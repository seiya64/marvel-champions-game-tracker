import { MARVEL_CHAMPIONS_GAME_TRACKER_KEY } from "@/constants/constants";
import { GameTrackerEntry } from "@/types/game-tracker-entry";
import { HeroOption } from "@/types/hero";
import { VillainOption } from "@/types/villain";
import { createStore } from "zustand/vanilla";

export type GameTrackerState = {
  selectedHero?: string;
  selectedVillain?: string;
  gameResult: string;
  selectedHeroOption?: HeroOption;
  selectedVillainOption?: VillainOption;
  gameTrackerEntries?: Array<GameTrackerEntry>;
  gameTrackerFirstLoad: boolean;
};

export type GameTrackerActions = {
  setHero: (hero: string) => void;
  setVillain: (villain: string) => void;
  setGameResult: (gameResult: string) => void;
  saveTrack: () => void;
  setHeroOption: (option: HeroOption) => void;
  setVillainOption: (option: VillainOption) => void;
  loadGameTrackerEntries: () => void;
  setGameTrackerFirstLoad: (value: boolean) => void;
};

export type GameTrackerStore = GameTrackerState & GameTrackerActions;

export const defaultInitState: GameTrackerState = {
  selectedHero: undefined,
  selectedVillain: undefined,
  gameResult: "lose",
  selectedHeroOption: undefined,
  selectedVillainOption: undefined,
  gameTrackerEntries: [],
  gameTrackerFirstLoad: true,
};

export const createGameTrackerStore = (
  initState: GameTrackerState = defaultInitState
) => {
  return createStore<GameTrackerStore>()((set) => ({
    ...initState,
    setHero: (hero: string) => set(() => ({ selectedHero: hero })),
    setVillain: (villain: string) => set(() => ({ selectedVillain: villain })),
    setGameResult: (gameResult: string) =>
      set(() => ({ gameResult: gameResult })),
    saveTrack: () =>
      set((state) => {
        let gameTrackListJSON = localStorage.getItem(
          MARVEL_CHAMPIONS_GAME_TRACKER_KEY
        );
        const gameTrackerList = gameTrackListJSON
          ? JSON.parse(gameTrackListJSON)
          : [];
        const gameTrack = {
          hero: state.selectedHero,
          villain: state.selectedVillain,
          gameResult: state.gameResult,
          date: new Date(),
        };
        gameTrackerList.push(gameTrack);

        gameTrackListJSON = JSON.stringify(gameTrackerList);
        localStorage.setItem(
          MARVEL_CHAMPIONS_GAME_TRACKER_KEY,
          gameTrackListJSON
        );
        return {
          ...state,
          selectedHero: undefined,
          selectedVillain: undefined,
          gameResult: "lose",
          selectedHeroOption: undefined,
          selectedVillainOption: undefined,
        };
      }),
    setHeroOption: (option: HeroOption) =>
      set(() => ({ selectedHeroOption: option })),
    setVillainOption: (option: VillainOption) =>
      set(() => ({ selectedVillainOption: option })),
    loadGameTrackerEntries: () =>
      set((state) => {
        const gameTrackerEntriesJSON =
          typeof window !== "undefined" && localStorage
            ? localStorage.getItem(MARVEL_CHAMPIONS_GAME_TRACKER_KEY)
            : JSON.stringify([]);

        const gameTrackerEntries = gameTrackerEntriesJSON
          ? JSON.parse(gameTrackerEntriesJSON)
          : [];

        return {
          ...state,
          gameTrackerEntries: gameTrackerEntries,
        };
      }),
    setGameTrackerFirstLoad: (value: boolean) =>
      set(() => ({ gameTrackerFirstLoad: value })),
  }));
};

