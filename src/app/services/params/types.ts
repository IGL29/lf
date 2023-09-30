import { ICheckboxesGroupData } from '~components/filters-form/types';
import { IRangeValue, RangeTarget } from '~components/range/types';

export interface IFormData<T = string> {
  [key: string]: ICheckboxesGroupData | IRangeValue | Array<T> | string | number;
}

export type ObjectExceptRange = Omit<ICheckboxesGroupData, RangeTarget>;

export interface IQueryParams {
  [key: string]: Array<string> | string | number;
}

export interface IOptionsConvertParams {
  isRemovedEmpty?: boolean;
}
