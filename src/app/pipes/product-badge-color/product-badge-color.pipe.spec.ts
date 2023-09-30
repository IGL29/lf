import { getMockProduct } from '__tests__/mocks/data/product';
import { ProductBadgeColorPipe } from './product-badge-color.pipe';

describe('ProductBadgeColorPipe', () => {
  let pipe: ProductBadgeColorPipe;

  beforeEach(() => {
    pipe = new ProductBadgeColorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return color for new product if product.isNew', () => {
    expect(pipe.transform(getMockProduct({ isNew: true }))).toBe('pink');
  });

  it('should return color for new product if product.isNew and product.price.discount', () => {
    expect(
      pipe.transform(getMockProduct({ isNew: true, price: { value: 500, discount: 10 } }))
    ).toBe('pink');
  });

  it('should return color for product with discount if product.price.discount', () => {
    expect(
      pipe.transform(getMockProduct({ isNew: null, price: { value: 500, discount: 10 } }))
    ).toBe('green');
  });

  it('should return null if product without discount and not new', () => {
    expect(pipe.transform(getMockProduct({ price: { value: 500, discount: 0 } }))).toBeNull();
  });
});
