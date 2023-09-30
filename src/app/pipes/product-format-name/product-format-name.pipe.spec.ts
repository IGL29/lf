import { ProductFormatNamePipe } from './product-format-name.pipe';

describe('ProductFormatNamePipe', () => {
  let pipe: ProductFormatNamePipe;

  beforeEach(() => {
    pipe = new ProductFormatNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return format name by flower value', () => {
    expect(pipe.transform('box')).toBe('В ящике');
  });

  it('should return value without changes if format name not found', () => {
    expect(pipe.transform('in-hand')).toBe('in-hand');
  });
});
