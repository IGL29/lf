import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateClientsContainerComponent } from './corporate-clients-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CorporateClientsService } from 'src/app/services/corporate/corporate-clients.service';
import { mockCorporateClientsService } from '__tests__/mocks/services/CorporateClientsService';
import { of } from 'rxjs';

describe('CorporateClientsContainerComponent', () => {
  let component: CorporateClientsContainerComponent;
  let fixture: ComponentFixture<CorporateClientsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporateClientsContainerComponent],
      providers: [
        {
          provide: CorporateClientsService,
          useValue: mockCorporateClientsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateClientsContainerComponent);
    component = fixture.componentInstance;
    component['subscribeToCorporateLoading'] = jasmine.createSpy();
    component['subscribeToResetForm'] = jasmine.createSpy();
    mockCorporateClientsService.getRequestLoading.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
