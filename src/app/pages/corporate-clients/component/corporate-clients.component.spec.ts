import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateClientsComponent } from './corporate-clients.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CorporateClientsComponent', () => {
  let component: CorporateClientsComponent;
  let fixture: ComponentFixture<CorporateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporateClientsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
