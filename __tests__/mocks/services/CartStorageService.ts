export const mockCartStorageService = jasmine.createSpyObj([
  'getProducts',
  'addProduct',
  'deleteProduct',
  'replaceProductCount',
  'clearAll'
]);
