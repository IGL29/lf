import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormContainerComponent } from './search-form-container.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockRouter } from '__tests__/mocks/router/router';
import { findElement } from '__tests__/utils/findElement';

describe('SearchFormContainerComponent', () => {
  let component: SearchFormContainerComponent;
  let fixture: ComponentFixture<SearchFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormContainerComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should call router.navigate with search data', () => {
      component['navigateToSearchPage']({ search: 'цветы' });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/searching-results'], {
        queryParams: { search: 'цветы' }
      });
    });
  });

  describe('template', () => {
    it('should call navigateToSearchPage with searching data if emit emitSubmitForm event', () => {
      const searchingFormDebugElement = findElement(fixture, '[data-test="searchForm"]');
      component['navigateToSearchPage'] = jasmine.createSpy();
      searchingFormDebugElement.triggerEventHandler('emitSubmitForm', { search: 'цветы' });
      expect(component['navigateToSearchPage']).toHaveBeenCalledWith({ search: 'цветы' });
    });
  });
});
