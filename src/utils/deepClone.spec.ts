import { deepClone } from './deepClone';

describe('deepClone', () => {
  it('should return clone object when called deepClone', () => {
    const targetObject = { name: 'rose', categories: ['category-1', 'category-2'] };
    expect(deepClone(targetObject)).toEqual(targetObject);
  });

  it('should return clone object with nested object when called deepClone', () => {
    const targetObject = {
      name: 'rose',
      categories: [{ name: 'category-1' }, { name: 'category-1' }]
    };
    expect(deepClone(targetObject)).toEqual(targetObject);
  });
});
