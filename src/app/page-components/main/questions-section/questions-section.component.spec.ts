import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsSectionComponent } from './questions-section.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DecorSectionComponent', () => {
  let component: QuestionsSectionComponent;
  let fixture: ComponentFixture<QuestionsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsSectionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
