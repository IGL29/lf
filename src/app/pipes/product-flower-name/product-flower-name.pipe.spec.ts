import { ProductFlowerNamePipe } from './product-flower-name.pipe';

describe('ProductFlowerNamePipe', () => {
  let pipe: ProductFlowerNamePipe;

  beforeEach(() => {
    pipe = new ProductFlowerNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return flower name by flower value', () => {
    expect(pipe.transform('anthurium')).toBe('Антуриум');
  });

  it('should return value without changes if flower name not found', () => {
    expect(pipe.transform('some-flower')).toBe('some-flower');
  });
});
