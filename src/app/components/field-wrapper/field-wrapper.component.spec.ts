import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldWrapperComponent } from './field-wrapper.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FieldWrapperComponent', () => {
  let component: FieldWrapperComponent;
  let fixture: ComponentFixture<FieldWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldWrapperComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FieldWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
