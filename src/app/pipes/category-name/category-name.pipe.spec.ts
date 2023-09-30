import { Categories } from '~types/product';
import { CategoryNamePipe } from './category-name.pipe';

describe('CategoryNamePipe', () => {
  let pipe: CategoryNamePipe;

  beforeEach(() => {
    pipe = new CategoryNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return category name by category value', () => {
    const baloonCategory: Categories = 'balloon';
    const giftsCategory: Categories = 'gifts';
    expect(pipe.transform(baloonCategory)).toBe('Шары');
    expect(pipe.transform(giftsCategory)).toBe('Подарки');
  });
});
