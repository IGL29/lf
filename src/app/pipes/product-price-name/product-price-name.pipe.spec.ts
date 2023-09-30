import { ProductPriceNamePipe } from './product-price-name.pipe';

describe('ProductPriceNamePipe', () => {
  let pipe: ProductPriceNamePipe;

  beforeEach(() => {
    pipe = new ProductPriceNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return price name by price value', () => {
    expect(pipe.transform('price')).toBe('цена');
  });

  it('should return value without changes if price name not found', () => {
    expect(pipe.transform('other')).toBe('other');
  });
});
