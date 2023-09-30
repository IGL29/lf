import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToOrderComponent } from './how-to-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HowToOrderComponent', () => {
  let component: HowToOrderComponent;
  let fixture: ComponentFixture<HowToOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToOrderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
