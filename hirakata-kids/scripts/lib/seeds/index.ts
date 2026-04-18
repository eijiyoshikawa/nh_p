import { parentingSeeds } from "./parenting";
import { outingsSeeds } from "./outings";
import { foodSeeds } from "./food";
import { healthSeeds } from "./health";
import { livingSeeds } from "./living";
import { communitySeeds } from "./community";
import type { TopicSeed } from "../topic-types";

export const allSeeds: TopicSeed[] = [
  ...parentingSeeds,
  ...outingsSeeds,
  ...foodSeeds,
  ...healthSeeds,
  ...livingSeeds,
  ...communitySeeds,
];
