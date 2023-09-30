import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeFieldContainerComponent } from './promocode-field-container.component';
import { PromocodeService } from 'src/app/services/promocode/promocode.service';
import { mockPromocodeService } from '__tests__/mocks/services/PromocodeService';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('PromocodeFieldContainerComponent', () => {
  let component: PromocodeFieldContainerComponent;
  let fixture: ComponentFixture<PromocodeFieldContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromocodeFieldContainerComponent],
      providers: [
        {
          provide: PromocodeService,
          useValue: mockPromocodeService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PromocodeFieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should call promocodeService.getDiscount with promocode', () => {
      component['handlerSubmitForm']({ promocode: 'PROMO' });
      expect(mockPromocodeService.getDiscount).toHaveBeenCalledWith('PROMO');
    });
  });

  describe('template', () => {
    it('should call handlerSubmitForm with promocode data if emit emitSubmitForm', () => {
      const promocodeFieldDebugElement = findElement(fixture, '[data-test="promocodeField"]');
      component['handlerSubmitForm'] = jasmine.createSpy();
      promocodeFieldDebugElement.triggerEventHandler('emitSubmitForm', { promocode: 'PROMO' });
      expect(component['handlerSubmitForm']).toHaveBeenCalledWith({ promocode: 'PROMO' });
    });
  });
});
