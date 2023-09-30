import { MaxNumberPipe } from './max-number.pipe';

describe('MaxNumberPipe', () => {
  let pipe: MaxNumberPipe;
  const maxValue = 50;

  beforeEach(() => {
    pipe = new MaxNumberPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return value without changes', () => {
    expect(pipe.transform(15, maxValue)).toBe('15');
  });

  it('should return max value if passed value more', () => {
    expect(pipe.transform(700, maxValue)).toBe(String(maxValue));
  });

  it('should return max value if passed value more and add postfix', () => {
    const postFix = '...';
    expect(pipe.transform(700, maxValue, postFix)).toBe(`${maxValue}${postFix}`);
  });
});
