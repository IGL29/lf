export const mockFeedbackService = jasmine.createSpyObj([
  'getClearFormStream$',
  'getFeedbackIsLoading',
  'submitForm',
  'subscribeToLoading',
  'resetForm',
  'doClearForm'
]);
