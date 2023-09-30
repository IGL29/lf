import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingContainerComponent } from './sorting-container.component';
import { ParamsService } from 'src/app/services/params/params.service';
import { mockParamsService } from '__tests__/mocks/services/ParamsService';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OPTIONS } from './data';
import { findElement } from '__tests__/utils/findElement';

describe('SortingContainerComponent', () => {
  let component: SortingContainerComponent;
  let fixture: ComponentFixture<SortingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingContainerComponent],
      providers: [
        {
          provide: ParamsService,
          useValue: mockParamsService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SortingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeChangeQueryParams'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeChangeQueryParams']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should call saveQueryParams and setActiveOption if queryParams changed', () => {
      component['saveQueryParams'] = jasmine.createSpy();
      component['setActiveOption'] = jasmine.createSpy();
      component['subscribeChangeQueryParams']();
      expect(component['saveQueryParams']).toHaveBeenCalled();
      expect(component['setActiveOption']).toHaveBeenCalled();
    });

    it('should set sortingParams from queryParams', () => {
      mockActivatedRoute['snapshot']['queryParams'] = { sort: 'asc', 'target-sort': 'price' };
      component['saveQueryParams']();
      expect(component['sortingParams']).toEqual({ sort: 'asc', targetSort: 'price' });
    });

    it('should set index from options to activeOptionIndex', () => {
      component['options'] = OPTIONS;
      component['sortingParams'] = { sort: 'asc', targetSort: 'price' };
      component['setActiveOption']();
      expect(component['activeOptionIndex']).toBe(3);
    });

    it('should set null if sortingParams not exist in options', () => {
      component['options'] = OPTIONS;
      component['sortingParams'] = { sort: null, targetSort: 'price' };
      component['setActiveOption']();
      expect(component['activeOptionIndex']).toBeNull();
    });

    it('should call sortingComponent.closeSorting', () => {
      component['sortingComponent'] = jasmine.createSpyObj(['closeSorting']);
      component['handlerSetSorting'](OPTIONS[0]);
      expect(component['sortingComponent']['closeSorting']).toHaveBeenCalled();
    });

    it('should call setQueryParams with null if passed option is null', () => {
      component['sortingComponent'] = jasmine.createSpyObj(['closeSorting']);
      component['setQueryParams'] = jasmine.createSpy();
      component['handlerSetSorting'](null);
      //@ts-ignore - bug in Jasmine with toHaveBeenCalledWith and overloaded function
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42455
      expect(component['setQueryParams']).toHaveBeenCalledWith(null);
    });

    it('should call setQueryParams with sort and targetSort if pass option', () => {
      component['sortingComponent'] = jasmine.createSpyObj(['closeSorting']);
      component['setQueryParams'] = jasmine.createSpy();
      component['handlerSetSorting'](OPTIONS[0]);
      expect(component['setQueryParams']).toHaveBeenCalledWith(
        OPTIONS[0].sort,
        OPTIONS[0].targetSort
      );
    });

    it('should call paramsService.resetParams with values of params is null if pass null', () => {
      component['setQueryParams'](null);
      expect(mockParamsService['resetParams']).toHaveBeenCalledWith({
        sort: null,
        'target-sort': null
      });
    });

    it('should call paramsService.setParams with pass params and initial params', () => {
      component['setQueryParams']('asc', 'price');
      expect(mockParamsService['setParams']).toHaveBeenCalledWith(
        { sort: 'asc', 'target-sort': 'price' },
        { sort: null, 'target-sort': null }
      );
    });
  });

  describe('template', () => {
    it('should pass option to sorting component', () => {
      const sortingDebugElement = findElement(fixture, '[data-test="sorting"]');
      expect(sortingDebugElement.nativeElement.options).toEqual(component['options']);
    });

    it('should pass activeOptionIndex to sorting component', () => {
      const sortingDebugElement = findElement(fixture, '[data-test="sorting"]');
      expect(sortingDebugElement.nativeElement.activeOptionIndex).toEqual(
        component['activeOptionIndex']
      );
    });

    it('should call handlerSetSorting with option if emit emitSetSorting event', () => {
      component['handlerSetSorting'] = jasmine.createSpy();
      const sortingDebugElement = findElement(fixture, '[data-test="sorting"]');
      sortingDebugElement.triggerEventHandler('emitSetSorting', OPTIONS[1]);
      expect(component['handlerSetSorting']).toHaveBeenCalledWith(OPTIONS[1]);
    });
  });
});
