import { Rating, RatingNotSet } from '../rating/types';
import { IReview } from '../review/types';

export interface INewReview extends Pick<IReview, 'author' | 'comment'> {
  rating: Rating | RatingNotSet;
  email: string;
}
