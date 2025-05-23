import { Hero } from "./hero";
import { Villain } from "./villain";

export type GameTrackerEntry = {
  hero: Hero;
  villain: Villain;
  gameResult: string;
  date: Date;
};

