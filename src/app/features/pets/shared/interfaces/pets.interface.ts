import { Pet } from "./pet.interface";

export interface Pets {
  items: Array<Pet>;
  hasNext: boolean;
  remainingRecords: number;
}
