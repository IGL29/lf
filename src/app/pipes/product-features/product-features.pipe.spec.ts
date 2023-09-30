import { ProductFeaturesPipe } from './product-features.pipe';

describe('ProductFeaturesPipe', () => {
  let pipe: ProductFeaturesPipe;

  beforeEach(() => {
    pipe = new ProductFeaturesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return product feature name by feature value', () => {
    expect(pipe.transform('light')).toBe('по свету');
  });

  it('should return value without changes if feature name not found', () => {
    expect(pipe.transform('size')).toBe('size');
  });
});
