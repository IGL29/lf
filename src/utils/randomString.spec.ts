import { generateRandomString } from './randomString';

describe('generateRandomString', () => {
  it('should return random string when called generateRandomString', () => {
    const resultOne = generateRandomString();
    const resultTwo = generateRandomString();
    expect(resultOne !== resultTwo).toBeTruthy();
  });
});
