"use client";

import GameTrackerForm from "@/components/game-tracker-form";
import GameTrackerGrid from "@/components/game-tracker-grid";
import {
  MARVEL_CHAMPIONS_GAME_TRACKER_KEY,
  MARVEL_CHAMPIONS_SETS_URL,
} from "@/constants/constants";
import { Hero } from "@/types/hero";
import { MarvelChampionsSet } from "@/types/marvel-champions-set";
import { Villain } from "@/types/villain";
import { useQuery } from "@tanstack/react-query";

const GameTrackerComponent = () => {
  const { data: marvelChampionsSets } = useQuery<Array<MarvelChampionsSet>>({
    queryKey: [MARVEL_CHAMPIONS_GAME_TRACKER_KEY],
    queryFn: () =>
      fetch(MARVEL_CHAMPIONS_SETS_URL).then((response) => response.json()),
  });

  const heroesList: Array<Hero> = marvelChampionsSets
    ? marvelChampionsSets
        .filter((set) => set.card_set_type_code == "hero")
        .map((set) => ({
          name: set.name,
          code: set.code,
        }))
    : [];

  const villainsList: Array<Villain> = marvelChampionsSets
    ? marvelChampionsSets
        .filter((set) => set.card_set_type_code == "villain")
        .map((set) => ({
          name: set.name,
          code: set.code,
        }))
    : [];

  return (
    <div>
      <div className="container mx-auto">
        <GameTrackerForm
          heroes={heroesList}
          villains={villainsList}
        ></GameTrackerForm>
      </div>
      <div className="container mx-auto">
        <GameTrackerGrid />
      </div>
    </div>
  );
};

export default GameTrackerComponent;

