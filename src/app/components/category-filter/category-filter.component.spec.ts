import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterComponent } from './category-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryFilterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call activeCategories.has with param', () => {
    const activeCategories = (component['activeCategories'] = jasmine.createSpyObj(['has']));
    activeCategories.has.and.returnValue(true);
    expect(component['isActiveCategory']('balloon')).toBeTrue();
    expect(activeCategories.has).toHaveBeenCalledWith('balloon');
  });

  it('should call emitSelectCategory.emit with param', () => {
    const targetElement = document.createElement('div');
    targetElement.setAttribute('data-param', 'gifts');
    const mouseEvent = { target: targetElement };
    spyOn(component['emitSelectCategory'], 'emit');
    component['handlerSelectCategory'](mouseEvent);
    expect(component['emitSelectCategory'].emit).toHaveBeenCalledWith('gifts');
  });

  it('should not call emitSelectCategory.emit if attribute with param not set', () => {
    const targetElement = document.createElement('div');
    const mouseEvent = { target: targetElement };
    spyOn(component['emitSelectCategory'], 'emit');
    component['handlerSelectCategory'](mouseEvent);
    expect(component['emitSelectCategory'].emit).not.toHaveBeenCalled();
  });

  it('should not call emitSelectCategory.emit if target element not found', () => {
    spyOn(component['emitSelectCategory'], 'emit');
    component['handlerSelectCategory']({});
    expect(component['emitSelectCategory'].emit).not.toHaveBeenCalled();
  });
});
