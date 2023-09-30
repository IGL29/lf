import { IRangeValue } from '~components/range/types';
import { Color, Flower, Format, Light } from '~types/product';

export interface IFiltersData extends ICheckboxesGroup, Record<string, unknown> {
  price: IRangeValue;
}
export interface ICheckboxesGroup {
  light: Light[];
  color: Color[];
  format: Format[];
  flower: Flower[];
}

export type TCheckboxesData = Light[] | Color[] | Format[] | Flower[];

export type CheckboxControlData = boolean | null;

export interface ICheckboxesGroupData {
  [key: string]: CheckboxControlData;
}

export interface IFiltersFormData {
  [key: string]: ICheckboxesGroupData | IRangeValue;
}
