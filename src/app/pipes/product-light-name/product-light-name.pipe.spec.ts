import { ProductLightNamePipe } from './product-light-name.pipe';

describe('ProductLightNamePipe', () => {
  let pipe: ProductLightNamePipe;

  beforeEach(() => {
    pipe = new ProductLightNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return light name by light value', () => {
    expect(pipe.transform('gentle')).toBe('Нежный');
  });

  it('should return value without changes if light name not found', () => {
    expect(pipe.transform('radiant')).toBe('radiant');
  });
});
