import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentComponent } from './app-content.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppContentComponent', () => {
  let component: AppContentComponent;
  let fixture: ComponentFixture<AppContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppContentComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
