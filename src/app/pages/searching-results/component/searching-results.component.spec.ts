import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingResultsComponent } from './searching-results.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchingResultsComponent', () => {
  let component: SearchingResultsComponent;
  let fixture: ComponentFixture<SearchingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingResultsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
