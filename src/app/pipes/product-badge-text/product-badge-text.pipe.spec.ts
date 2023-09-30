import { getMockProduct } from '__tests__/mocks/data/product';
import { ProductBadgeTextPipe } from './product-badge-text.pipe';

describe('ProductBadgeTextPipe', () => {
  let pipe: ProductBadgeTextPipe;

  beforeEach(() => {
    pipe = new ProductBadgeTextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return text for new product if product.isNew', () => {
    expect(pipe.transform(getMockProduct({ isNew: true }))).toBe('new');
  });

  it('should return text for new product if product.isNew and product.price.discount', () => {
    expect(
      pipe.transform(getMockProduct({ isNew: true, price: { value: 500, discount: 10 } }))
    ).toBe('new');
  });

  it('should return text for product with discount if product.price.discount', () => {
    expect(
      pipe.transform(getMockProduct({ isNew: null, price: { value: 500, discount: 10 } }))
    ).toBe('sale');
  });

  it('should return empty string if product without discount and not new', () => {
    expect(pipe.transform(getMockProduct({ price: { value: 500, discount: 0 } }))).toBe('');
  });
});
