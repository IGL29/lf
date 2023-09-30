import { Sort } from '~components/sorting/types';

export type TargetSort = 'price' | 'rating';
export interface ISortingParams {
  targetSort: TargetSort | null;
  sort: Sort | null;
}
