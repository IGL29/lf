import { ProductColorNamePipe } from './product-color-name.pipe';

describe('ProductColorNamePipe', () => {
  let pipe: ProductColorNamePipe;

  beforeEach(() => {
    pipe = new ProductColorNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return color name by color value', () => {
    expect(pipe.transform('green')).toBe('Зеленый');
  });

  it('should return value without changes if color name not found', () => {
    expect(pipe.transform(<any>'green-red')).toBe('green-red');
  });
});
