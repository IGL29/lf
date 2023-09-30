import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFieldComponent } from './error-field.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorFieldComponent', () => {
  let component: ErrorFieldComponent;
  let fixture: ComponentFixture<ErrorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorFieldComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
