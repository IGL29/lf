export { isArray, isNonNull, isObject } from './guards';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface IObject {
  [key: string]: unknown;
}
