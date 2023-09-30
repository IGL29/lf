import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersFormContainerComponent } from './filters-form-container.component';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ParamsService } from 'src/app/services/params/params.service';
import { mockParamsService } from '__tests__/mocks/services/ParamsService';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { mockUtilsService } from '__tests__/mocks/services/UtilsService';
import { of } from 'rxjs';
import { findElement } from '__tests__/utils/findElement';

describe('FiltersFormContainerComponent', () => {
  let component: FiltersFormContainerComponent;
  let fixture: ComponentFixture<FiltersFormContainerComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(FiltersFormContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [FiltersFormContainerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService
        },
        {
          provide: ParamsService,
          useValue: mockParamsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToQueryParams'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeToQueryParams']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should set updatedFiltersData from queryParams', () => {
      mockActivatedRoute['queryParams'].next({ color: ['white', 'yellow'] });
      mockParamsService['convertParamsToData'].and.returnValue({
        color: { white: true, yellow: true, green: false, red: false }
      });
      component['subscribeToQueryParams']();
      expect(component['updatedFiltersData']).toEqual({
        color: { white: true, yellow: true, green: false, red: false }
      });
    });

    it('should set initial data to updatedFiltersData', () => {
      component['updatedFiltersData'] = { color: { white: true, yellow: true } };
      component['initialFilterData'] = { color: { white: false, yellow: false } };
      component['handlerResetFilters']();
      expect(component['updatedFiltersData']).toEqual({ color: { white: false, yellow: false } });
    });

    it('should call paramsService.setParams with form data converted to params and initial params', () => {
      component['initialFilterParams'] = { color: [] };
      mockParamsService['getDataWidthoutDefault'].and.returnValue({ color: { white: true } });
      mockParamsService['convertDataToParams'].and.returnValue({ color: ['white'] });
      component['handlerControlsValueChanged']({ color: { white: true, yellow: false } });
      expect(mockParamsService['setParams']).toHaveBeenCalledWith(
        { color: ['white'] },
        { color: [] }
      );
    });
  });

  describe('template', () => {
    it('should pass filtersData to filters form component', () => {
      Object.defineProperty(component, 'filtersDefaultData', {
        writable: true,
        configurable: true,
        value: { color: { white: false, yellow: true } }
      });
      fixture.detectChanges();
      const filtersFormDebugElement = findElement(fixture, '[data-test="filtersForm"]');
      expect(filtersFormDebugElement.nativeElement.filtersData).toEqual({
        color: { white: false, yellow: true }
      });
    });

    it('should pass updatedFilterData to filters form component', () => {
      component['updatedFiltersData'] = { color: { white: true, yellow: false } };
      fixture.detectChanges();
      const filtersFormDebugElement = findElement(fixture, '[data-test="filtersForm"]');
      expect(filtersFormDebugElement.nativeElement.updatedFiltersData).toEqual({
        color: { white: true, yellow: false }
      });
    });

    it('should call handlerControlsValueChanged with changed filters data if emit emitControlsValueChanged event', () => {
      component['handlerControlsValueChanged'] = jasmine.createSpy();
      const filtersFormDebugElement = findElement(fixture, '[data-test="filtersForm"]');
      filtersFormDebugElement.triggerEventHandler('emitControlsValueChanged', {
        color: { white: true, yellow: true }
      });
      expect(component['handlerControlsValueChanged']).toHaveBeenCalledWith({
        color: { white: true, yellow: true }
      });
    });

    it('should call handlerResetFilters if emit emitResetFilters', () => {
      component['handlerResetFilters'] = jasmine.createSpy();
      const filtersFormDebugElement = findElement(fixture, '[data-test="filtersForm"]');
      filtersFormDebugElement.triggerEventHandler('emitResetFilters');
      expect(component['handlerResetFilters']).toHaveBeenCalled();
    });
  });
});
