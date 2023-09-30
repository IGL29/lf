export type Sort = 'asc' | 'desc';

export interface IOption<T extends string = never> {
  categoryTitle: CategoryTitle;
  title: Title;
  sort: Sort;
  targetSort: T;
}

export type Title = string;
export type CategoryTitle = string;
