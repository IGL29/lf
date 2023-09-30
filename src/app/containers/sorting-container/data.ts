import { IOption } from 'src/app/components/sorting/types';
import { TargetSort } from './types';

export const OPTIONS: IOption<TargetSort>[] = [
  {
    categoryTitle: 'По популярности',
    title: 'Сначала популярные',
    sort: 'desc',
    targetSort: 'rating'
  },
  {
    categoryTitle: 'По популярности',
    title: 'Сначала не популярные',
    sort: 'asc',
    targetSort: 'rating'
  },
  {
    categoryTitle: 'По цене',
    title: 'Сначала дорогие',
    sort: 'desc',
    targetSort: 'price'
  },
  {
    categoryTitle: 'По цене',
    title: 'Сначала дешевые',
    sort: 'asc',
    targetSort: 'price'
  }
];
