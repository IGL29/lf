import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialComponent } from './special.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GetWordPipe } from 'src/app/pipes/get-word/get-word.pipe';

describe('SpecialComponent', () => {
  let component: SpecialComponent;
  let fixture: ComponentFixture<SpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialComponent, GetWordPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
