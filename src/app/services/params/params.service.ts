import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IObject, isArray, isObject } from 'src/types';
import { IRangeValue } from '~components/range/types';
import { IFormData, IOptionsConvertParams, IQueryParams } from './types';
import { ICheckboxesGroupData } from '~components/filters-form/types';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public getExternalParams(currentParams: Params, allParams: Params) {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(allParams)) {
      if (!(key in currentParams)) {
        result[key] = value;
      }
    }
    return result;
  }

  resetParams<T extends Params>(resettableParams: T) {
    const queryParamsAll = this.activatedRoute.snapshot.queryParams;
    const externalParams = this.getExternalParams(resettableParams, queryParamsAll);
    this.navigateRelativeActivated(externalParams);
  }

  setParams(currentParams: Params, initialParams: Params) {
    const queryParamsAll = this.activatedRoute.snapshot.queryParams;
    const externalParams = this.getExternalParams(initialParams, queryParamsAll);
    const filterParamsWithExternal = {
      ...currentParams,
      ...externalParams
    };
    this.navigateRelativeActivated(filterParamsWithExternal);
  }

  private navigateRelativeActivated(params: Params): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params
    });
  }

  public convertDataToParams(
    formData: Partial<IFormData>,
    options: IOptionsConvertParams = {
      isRemovedEmpty: true
    }
  ): IQueryParams {
    let queryParams: IQueryParams = {};

    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value) && value.length === 0 && options.isRemovedEmpty) {
        continue;
      }
      if (Array.isArray(value)) {
        queryParams[key] = value;
        continue;
      }
      if (value && typeof value === 'object' && ('from' in value || 'to' in value)) {
        queryParams = {
          ...queryParams,
          ...this.convertRangeToParams(<IRangeValue>value, key)
        };
      }
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !('from' in value || 'to' in value)
      ) {
        queryParams[key] = this.getArrayFilledVallues(
          <ICheckboxesGroupData>value,
          options.isRemovedEmpty
        );
        continue;
      }
      if (
        (value !== null &&
          !value &&
          !options.isRemovedEmpty &&
          (typeof value === 'string' || typeof value === 'number')) ||
        (value && typeof value === 'string') ||
        typeof value === 'number'
      ) {
        queryParams[key] = value;
      }
    }
    return queryParams;
  }

  public convertRangeToParams(rangeValue: Partial<IRangeValue>, key: string): IQueryParams {
    const rangeParams: IQueryParams = {};

    if ('from' in rangeValue && rangeValue.from) {
      const keyFrom = key + 'from';
      rangeParams[keyFrom] = rangeValue.from;
    }
    if ('to' in rangeValue && rangeValue.to) {
      const keyTo = key + 'to';
      rangeParams[keyTo] = rangeValue.to;
    }
    return rangeParams;
  }

  private getArrayFilledVallues(
    objectValues: ICheckboxesGroupData,
    isRemovedEmpty = true
  ): string[] {
    const result = [];

    for (const [key, value] of Object.entries(objectValues)) {
      if (!isRemovedEmpty) {
        result.push(key);
        continue;
      }
      if ((value === false || value === null) && isRemovedEmpty) {
        continue;
      }
      result.push(key);
    }
    return result;
  }

  public getDataWidthoutDefault(
    current: Partial<IFormData> | Partial<ICheckboxesGroupData>,
    initial: Partial<IFormData> | Partial<ICheckboxesGroupData>
  ): Partial<IFormData> | Partial<ICheckboxesGroupData> {
    const result: Partial<IFormData> = {};

    for (const [key, value] of Object.entries(current)) {
      const initialValue = initial[key];
      if (this.isNotDiffersArray(value, initialValue)) {
        continue;
      }
      if (
        value &&
        typeof value === 'object' &&
        !isArray(value) &&
        isObject(initialValue) &&
        !isArray(initialValue)
      ) {
        const resultInnerValue = this.getDataWidthoutDefault(value, initialValue);
        if (Object.entries(resultInnerValue).length) {
          result[key] = <ICheckboxesGroupData>resultInnerValue;
        }
        continue;
      }
      if (value === initial[key]) {
        continue;
      }
      if (
        (value === null || value === false) &&
        (initial[key] === null || initial[key] === false)
      ) {
        continue;
      }
      result[key] = value;
    }
    return result;
  }

  private isNotDiffersArray(valueFirst: unknown, valueSecond: unknown): boolean {
    return Boolean(
      valueFirst &&
        valueSecond &&
        Array.isArray(valueFirst) &&
        Array.isArray(valueSecond) &&
        !this.isDifferArray(valueFirst, valueSecond)
    );
  }

  public isDifferArray(arrayFirst: string[], arraySecond: string[]): boolean {
    if (arrayFirst.length !== arraySecond.length) {
      return true;
    }
    for (const itemFirst of arrayFirst) {
      if (arraySecond.some((itemSecond) => itemSecond === itemFirst)) {
        continue;
      }
      return true;
    }
    return false;
  }

  public convertParamsToData<T = Array<string>>(currentParams: Params, initData: IFormData<T>) {
    const result = <Record<keyof IFormData<T>, IFormData<T>[keyof IFormData<T>]>>{};

    if (!currentParams) {
      return result;
    }

    for (const key of Object.keys(initData)) {
      if (key in currentParams) {
        const valuesFromParams = currentParams[key];

        if (Array.isArray(valuesFromParams) && Array.isArray(initData[key])) {
          result[key] = valuesFromParams;
        }
        if (
          !Array.isArray(valuesFromParams) &&
          typeof valuesFromParams !== 'object' &&
          Array.isArray(initData[key])
        ) {
          result[key] = [currentParams[key]];
        }
        if (
          !Array.isArray(valuesFromParams) &&
          typeof valuesFromParams !== 'object' &&
          !Array.isArray(initData[key]) &&
          typeof initData[key] === 'object'
        ) {
          result[key] = result[key] ?? {};
          (<IObject>result[key])[valuesFromParams] = true;
        }
        if (
          Array.isArray(currentParams[key]) &&
          typeof currentParams[key] === 'object' &&
          !Array.isArray(initData[key]) &&
          typeof initData[key] === 'object'
        ) {
          result[key] = result[key] ?? {};
          currentParams[key].forEach((item: string) => ((<IObject>result[key])[item] = true));
        }
      }
      const valueFromInit = initData[key];

      if (
        valueFromInit &&
        typeof valueFromInit === 'object' &&
        valueFromInit &&
        'to' in valueFromInit &&
        key + 'to' in currentParams
      ) {
        result[key] = result[key] ?? {};
        (<IObject>result[key])['to'] = Number(currentParams[key + 'to']);
      }
      if (
        valueFromInit &&
        typeof valueFromInit === 'object' &&
        valueFromInit &&
        'from' in valueFromInit &&
        key + 'from' in currentParams
      ) {
        result[key] = result[key] ?? {};
        (<IObject>result[key])['from'] = Number(currentParams[key + 'from']);
      }
      if (typeof valueFromInit === 'string' && typeof currentParams[key] === 'string') {
        result[key] = currentParams[key];
      }
      if (typeof valueFromInit === 'number' && typeof currentParams[key] === 'number') {
        result[key] = currentParams[key];
      }
    }

    return result;
  }
}
