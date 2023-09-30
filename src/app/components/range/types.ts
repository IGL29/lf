import { OnChangeCallback } from '~types/controlValueAccessor';

export interface IRangeValue {
  from: number;
  to: number;
}

export type RangeTarget = 'from' | 'to';
export type RangeCallbackOnChange = OnChangeCallback<IRangeValue>;
