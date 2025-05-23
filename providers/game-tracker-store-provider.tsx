"use client";
import {
  createGameTrackerStore,
  GameTrackerStore,
} from "@/stores/game-tracker-store";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type GameTrackerStoreApi = ReturnType<typeof createGameTrackerStore>;

export const GameTrackerStoreContext = createContext<
  GameTrackerStoreApi | undefined
>(undefined);

export interface GameTrackerStoreProviderProps {
  children: ReactNode;
}

export const GameTrackerStoreProvider = ({
  children,
}: GameTrackerStoreProviderProps) => {
  const storeRef = useRef<GameTrackerStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createGameTrackerStore();
  }

  return (
    <GameTrackerStoreContext.Provider value={storeRef.current}>
      {children}
    </GameTrackerStoreContext.Provider>
  );
};

export const useGameTrackerStore = <T,>(
  selector: (store: GameTrackerStore) => T
): T => {
  const gameTrackerStoreContext = useContext(GameTrackerStoreContext);

  if (!gameTrackerStoreContext) {
    throw new Error(
      `useGameTrackerStore must be used within GameTrackerStoreProvider`
    );
  }

  return useStore(gameTrackerStoreContext, selector);
};

