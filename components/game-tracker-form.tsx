"use client";

import { useGameTrackerStore } from "@/providers/game-tracker-store-provider";
import { Hero } from "@/types/hero";
import { Villain } from "@/types/villain";
import {
  Autocomplete,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { FC, ReactElement } from "react";

type GameTrackerFormProps = {
  heroes: Array<Hero>;
  villains: Array<Villain>;
};

const GameTrackerForm: FC<GameTrackerFormProps> = ({
  heroes,
  villains,
}: GameTrackerFormProps): ReactElement => {
  const selectedHero = useGameTrackerStore((state) => state.selectedHero);
  const selectedVillain = useGameTrackerStore((state) => state.selectedVillain);
  const gameResult = useGameTrackerStore((state) => state.gameResult);
  const selectedHeroOption = useGameTrackerStore(
    (state) => state.selectedHeroOption
  );
  const selectedVillainOption = useGameTrackerStore(
    (state) => state.selectedVillainOption
  );
  const setHero = useGameTrackerStore((state) => state.setHero);
  const setVillain = useGameTrackerStore((state) => state.setVillain);
  const setGameResult = useGameTrackerStore((state) => state.setGameResult);
  const saveTrack = useGameTrackerStore((state) => state.saveTrack);
  const setHeroOption = useGameTrackerStore((state) => state.setHeroOption);
  const setVillainOption = useGameTrackerStore(
    (state) => state.setVillainOption
  );
  const loadGameTrackerEntries = useGameTrackerStore(
    (state) => state.loadGameTrackerEntries
  );

  const villainsOptions = villains.map((villain) => ({
    label: villain.name,
    id: villain.code,
  }));
  const heroesOptions = heroes.map((hero) => ({
    label: hero.name,
    id: hero.code,
  }));

  const onChangeHero = (event: any, value: any) => {
    setHeroOption(value);
    setHero(value.label);
  };

  const onChangeVillain = (event: any, value: any) => {
    setVillainOption(value);
    setVillain(value.label);
  };

  const onChangeGameResult = (event: any, value: any) => {
    setGameResult(value);
  };

  const onSave = () => {
    if (selectedHero && selectedVillain) {
      saveTrack();
      loadGameTrackerEntries();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-6 py-5">
      <Autocomplete
        className="w-50"
        disablePortal
        options={heroesOptions}
        renderInput={(params) => <TextField {...params} label="Hero" />}
        onChange={onChangeHero}
        value={selectedHeroOption || null}
      />
      <Autocomplete
        className="w-50"
        disablePortal
        options={villainsOptions}
        renderInput={(params) => <TextField {...params} label="Villain" />}
        onChange={onChangeVillain}
        value={selectedVillainOption || null}
      />
      <ToggleButtonGroup
        exclusive
        onChange={onChangeGameResult}
        color="primary"
        value={gameResult}
      >
        <ToggleButton value="win">Win</ToggleButton>
        <ToggleButton value="lose">Lose</ToggleButton>
      </ToggleButtonGroup>
      <div className="w-20 flex items-center justify-center">
        <Button variant="outlined" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default GameTrackerForm;

