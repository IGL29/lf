import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCardComponent } from './product-list-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductListCardComponent', () => {
  let component: ProductListCardComponent;
  let fixture: ComponentFixture<ProductListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
