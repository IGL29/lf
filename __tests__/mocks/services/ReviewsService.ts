import { of } from 'rxjs';
import { getMockReview } from '../data/review';

export const mockReviewsService = jasmine.createSpyObj([
  'getComments',
  'getCommentsError',
  'postCommentError',
  'commentsIsLoading',
  'getResetFormStream',
  'postCommentIsLoading',
  'subscribeToResetForm'
]);
export const mockReviewsData = [getMockReview(), getMockReview()];
