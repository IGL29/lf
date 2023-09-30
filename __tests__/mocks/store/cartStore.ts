export const mockCartStore = jasmine.createSpyObj([
  'isCartSelector',
  'cartPriceSelector',
  'cartDiscountSelector',
  'countInCartSelector',
  'cartLoadingSelector',
  'cartErrorSelector',
  'cartPostingLoading',
  'postChangeCountAction',
  'postProductAction',
  'clearAllAction',
  'requestAction',
  'deleteProductAction'
]);
