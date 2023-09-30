import { TestBed } from '@angular/core/testing';

import { ParamsService } from './params.service';
import { ActivatedRoute, Router } from '@angular/router';

const mockActivatedRoute = jasmine.createSpyObj(['snapshot']);
const mockRouter = jasmine.createSpyObj(['navigate']);
const initialParams = { categories: [], value: '' };
const currentParams = { categories: ['balloon'], value: 'some-value' };
const externalParams = { page: '2', size: '50' };
const allParams = { ...currentParams, ...externalParams };
const mockCheckboxValues = { red: true, green: null, blue: false };
const mockInitialFormData = {
  text: '',
  price: { from: 1, to: 100 },
  colors: ['green'],
  categories: [],
  count: 0,
  checkboxes: { red: null, green: null, blue: null }
};
const mockCurrentParams = {
  text: 'some text',
  pricefrom: 1,
  priceto: 50,
  colors: ['red', 'green', 'blue'],
  categories: [],
  count: 7,
  checkboxes: ['red', 'green', 'blue']
};

describe('ParamsService', () => {
  let service: ParamsService;
  let spyServiceNavigateRelativeActivated: jasmine.Spy<ParamsService['navigateRelativeActivated']>;

  const mockCurrentFormData = {
    text: 'some text',
    price: { from: 1, to: 50 },
    colors: ['red', 'green', 'blue'],
    categories: [],
    count: 7,
    checkboxes: mockCheckboxValues
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParamsService,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
    service = TestBed.inject(ParamsService);
    mockActivatedRoute['snapshot']['queryParams'] = allParams;
    spyServiceNavigateRelativeActivated = spyOn<any>(service, 'navigateRelativeActivated');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return difference of params', () => {
    const result = service.getExternalParams(currentParams, allParams);
    expect(result).toEqual(externalParams);
  });

  it('should be called navigateRelativeActivated with externalParams', () => {
    service.resetParams(currentParams);
    expect(service['navigateRelativeActivated']).toHaveBeenCalledWith(externalParams);
  });

  it('should be called navigateRelativeActivated with allParams', () => {
    service.setParams(currentParams, initialParams);
    expect(service['navigateRelativeActivated']).toHaveBeenCalledWith(allParams);
  });

  it('should be called router.navigate with correctly arguments', () => {
    spyServiceNavigateRelativeActivated.and.callThrough();
    service['navigateRelativeActivated'](currentParams);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: mockActivatedRoute,
      queryParams: currentParams
    });
  });

  it('should be return query params', () => {
    const rangeValue = { from: 5, to: 100 };
    const key = 'price';
    expect(service.convertRangeToParams(rangeValue, key)).toEqual({
      pricefrom: rangeValue.from,
      priceto: rangeValue.to
    });
  });

  it('should be return query params', () => {
    const rangeValue = { from: 5, to: 100 };
    const key = 'price';
    expect(service.convertRangeToParams(rangeValue, key)).toEqual({
      pricefrom: rangeValue.from,
      priceto: rangeValue.to
    });
    expect(service.convertRangeToParams({ from: rangeValue.from }, key)).toEqual({
      pricefrom: rangeValue.from
    });
  });

  it('should be return array of values', () => {
    expect(service['getArrayFilledVallues'](mockCheckboxValues)).toEqual(['red']);
  });

  it('should be return array of values with empty', () => {
    expect(service['getArrayFilledVallues'](mockCheckboxValues, false)).toEqual([
      'red',
      'green',
      'blue'
    ]);
  });

  it('should be return data without initial values', () => {
    expect(service.getDataWidthoutDefault(mockCurrentFormData, mockInitialFormData)).toEqual(<any>{
      text: 'some text',
      price: { to: 50 },
      colors: ['red', 'green', 'blue'],
      count: 7,
      checkboxes: { red: true }
    });
  });

  it('should be return query params form data', () => {
    expect(service.convertDataToParams(mockCurrentFormData)).toEqual({
      text: 'some text',
      pricefrom: 1,
      priceto: 50,
      colors: ['red', 'green', 'blue'],
      count: 7,
      checkboxes: ['red']
    });
  });

  it('should be return query params form data with empty', () => {
    expect(service.convertDataToParams(mockCurrentFormData, { isRemovedEmpty: false })).toEqual(
      mockCurrentParams
    );
  });

  it('should be return query params form data with empty', () => {
    expect(service.convertDataToParams(mockCurrentFormData, { isRemovedEmpty: false })).toEqual({
      text: 'some text',
      pricefrom: 1,
      priceto: 50,
      categories: [],
      colors: ['red', 'green', 'blue'],
      count: 7,
      checkboxes: ['red', 'green', 'blue']
    });
  });

  it('should be return true', () => {
    spyOn(service, 'isDifferArray').and.returnValue(false);
    expect(service['isNotDiffersArray']([1, 2, 3, '4'], [1, 2, 3, '4'])).toBeTrue();
  });

  it('should be return false', () => {
    spyOn(service, 'isDifferArray').and.returnValue(true);
    expect(service['isNotDiffersArray'](['1', '2'], ['1', '2'])).toBeFalse();
  });

  it('should be return true', () => {
    expect(service.isDifferArray(['1'], ['1', '2'])).toBeTrue();
  });

  it('should be return false', () => {
    expect(service.isDifferArray(['1', '2'], ['1', '2'])).toBeFalse();
  });

  it('should be return false', () => {
    expect(service.isDifferArray(['1', '2'], ['1', '2'])).toBeFalse();
  });

  it('should be return formData', () => {
    expect(service.convertParamsToData(mockCurrentParams, <any>mockInitialFormData)).toEqual(<any>{
      ...mockCurrentFormData,
      checkboxes: { red: true, green: true, blue: true }
    });
  });
});
