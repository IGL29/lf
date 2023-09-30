import { INewReview } from '~components/review-form/types';

export const getMockReview = ({
  comment = 'Some text',
  author = 'Some name',
  createdAt = new Date(),
  rating = 5
} = {}) => ({
  comment,
  author,
  createdAt,
  rating
});

export const getMockNewReview = ({
  comment = 'Some text',
  author = 'Some name',
  email = 'example@email.ru',
  rating = 5
} = {}): INewReview => ({
  comment,
  author,
  email,
  rating
});
