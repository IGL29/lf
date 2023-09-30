import { Rating } from '../rating/types';

export interface IReview {
  comment: string;
  author: string;
  createdAt: Date;
  rating: Rating;
}
