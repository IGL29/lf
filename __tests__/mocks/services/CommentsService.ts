export const mockCommentsService = jasmine.createSpyObj([
  'requestComments',
  'getComments',
  'commentsIsLoading',
  'getCommentsError',
  'postComment',
  'postCommentLoading',
  'postCommentError'
]);
