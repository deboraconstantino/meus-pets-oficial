import { Owner } from './owner.interface';

export interface Owners {
  items: Array<Owner>;
  hasNext: boolean;
  remainingRecords: number;
}
