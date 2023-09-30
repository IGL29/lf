import { TestBed } from '@angular/core/testing';

import { SortingComponent } from './sorting.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
