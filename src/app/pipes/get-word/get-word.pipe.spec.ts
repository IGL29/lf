import { GetWordPipe } from './get-word.pipe';

describe('GetWordPipe', () => {
  let pipe: GetWordPipe;
  const value = 'Lorem, ipsum dolor.';

  beforeEach(() => {
    pipe = new GetWordPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return part of string by word index', () => {
    expect(pipe.transform(value, 0)).toBe('Lorem,');
    expect(pipe.transform(value, 1)).toBe('ipsum');
  });

  it('should return value without changings if passed with not incorrected index', () => {
    expect(pipe.transform(value, 5)).toBe(value);
  });
});
