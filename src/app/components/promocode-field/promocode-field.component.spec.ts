import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeFieldComponent } from './promocode-field.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PromocodeFieldComponent', () => {
  let component: PromocodeFieldComponent;
  let fixture: ComponentFixture<PromocodeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromocodeFieldComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocodeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
