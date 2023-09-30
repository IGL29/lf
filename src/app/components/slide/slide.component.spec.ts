import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideComponent } from './slide.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SlideComponent', () => {
  let component: SlideComponent;
  let fixture: ComponentFixture<SlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
