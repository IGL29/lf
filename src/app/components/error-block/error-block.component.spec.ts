import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBlockComponent } from './error-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorBlockComponent', () => {
  let component: ErrorBlockComponent;
  let fixture: ComponentFixture<ErrorBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
