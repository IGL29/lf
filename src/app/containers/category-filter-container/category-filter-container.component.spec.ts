import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterContainerComponent } from './category-filter-container.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService,
  sizesData
} from '__tests__/mocks/services/ViewportSizeService';
import { BehaviorSubject, of } from 'rxjs';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { ParamsService } from 'src/app/services/params/params.service';
import { mockParamsService } from '__tests__/mocks/services/ParamsService';
import { findElement } from '__tests__/utils/findElement';

describe('HeroComponent', () => {
  let component: CategoryFilterContainerComponent;
  let fixture: ComponentFixture<CategoryFilterContainerComponent>;
  let mockViewportSizeService: mockViewportSizeService;

  beforeEach(async () => {
    TestBed.overrideComponent(CategoryFilterContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [CategoryFilterContainerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        },
        {
          provide: ParamsService,
          useValue: mockParamsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterContainerComponent);
    component = fixture.componentInstance;
    mockViewportSizeService = TestBed.inject(ViewportSizeService);
    mockViewportSizeService['resizeObservable$'] = of(sizesData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToViewportSize'] = jasmine.createSpy();
      component['subscribeToQueryParams'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeToViewportSize']).toHaveBeenCalled();
      expect(component['subscribeToQueryParams']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should set width from stream', () => {
      component['width'] = 0;
      component['subscribeToViewportSize']();
      expect(component['width']).toBe(1200);
    });

    it('should return true', () => {
      component['width'] = 768;
      expect(component['isMobile']).toBeTrue();
    });

    it('should return false', () => {
      component['width'] = 769;
      expect(component['isMobile']).toBeFalse();
    });

    it('should call setAciveFromParams with category param', () => {
      component['subscribeToQueryParams']();
      mockParamsService['convertParamsToData'] = jasmine
        .createSpy()
        .and.returnValue({ category: ['balloon'] });
      component['setActiveFromParams'] = jasmine.createSpy();
      mockActivatedRoute['queryParams'].next({ category: 'balloon', page: 2 });
      expect(component['setActiveFromParams']).toHaveBeenCalledWith(['balloon']);
    });

    it('should set activeCategories', () => {
      component['setActiveFromParams'](['balloon', 'chrysanthemum']);
      expect(component['activeCategories']).toEqual(new Set(['balloon', 'chrysanthemum']));
    });

    it('should set empty Set to activeCategories if categories not known', () => {
      component['setActiveFromParams'](<any>['notknowncategory', 'notknowncategory2']);
      expect(component['activeCategories']).toEqual(new Set([]));
    });

    it('should call switchCategory with params and call setQueryParams', () => {
      component['switchCategory'] = jasmine.createSpy();
      component['setQueryParams'] = jasmine.createSpy();
      component['handlerSelectCategory']('balloon');
      expect(component['switchCategory']).toHaveBeenCalledWith('balloon');
      expect(component['setQueryParams']).toHaveBeenCalled();
    });

    it('should remove getted category from activeCategories if category is already exist', () => {
      component['activeCategories'] = new Set(['balloon']);
      component['switchCategory']('balloon');
      expect(component['activeCategories']).toEqual(new Set([]));
    });

    it('should add getted category to activeCategories if category not exist', () => {
      component['activeCategories'] = new Set([]);
      component['switchCategory']('balloon');
      expect(component['activeCategories']).toEqual(new Set(['balloon']));
    });

    it('should call paramsService.setParams with categories from activeCategories', () => {
      component['activeCategories'] = new Set(['balloon']);
      component['setQueryParams']();
      expect(mockParamsService['setParams']).toHaveBeenCalledWith(
        { category: ['balloon'] },
        component['initialValueFilters']
      );
    });
  });

  describe('template', () => {
    it('should render accordion with category filter if isMobile is true', () => {
      spyOnProperty(component, 'isMobile').and.returnValue(true);
      fixture.detectChanges();
      const accordionCategory = findElement(fixture, '[data-test="accordionCategory"]');
      expect(accordionCategory).toBeTruthy();
    });

    it('should render accordion with category filter if isMobile is true', () => {
      spyOnProperty(component, 'isMobile').and.returnValue(false);
      fixture.detectChanges();
      const accordionCategory = findElement(fixture, '[data-test="accordionCategory"]');
      expect(accordionCategory).toBeFalsy();
    });

    it('should pass categories to category filter', () => {
      const categoryFilterDebugElement = findElement(fixture, '[data-test="categoryFilter"]');
      component['categoriesData'] = [{ paramValue: 'balloon', title: 'Шары' }];
      fixture.detectChanges();
      expect(categoryFilterDebugElement.nativeElement.categories).toEqual([
        { paramValue: 'balloon', title: 'Шары' }
      ]);
    });

    it('should pass activeCategories to category filter', () => {
      const categoryFilterDebugElement = findElement(fixture, '[data-test="categoryFilter"]');
      component['activeCategories'] = <any>['balloon'];
      fixture.detectChanges();
      expect(categoryFilterDebugElement.nativeElement.activeCategories).toEqual(['balloon']);
    });

    it('should call handlerSelectCategory with params if emit emitSelectCategory', () => {
      const categoryFilterDebugElement = findElement(fixture, '[data-test="categoryFilter"]');
      component['handlerSelectCategory'] = jasmine.createSpy();
      categoryFilterDebugElement.triggerEventHandler('emitSelectCategory', 'balloon');
      expect(component['handlerSelectCategory']).toHaveBeenCalledWith('balloon');
    });
  });
});
