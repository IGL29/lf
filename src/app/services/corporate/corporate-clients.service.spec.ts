import { TestBed } from '@angular/core/testing';

import { CorporateClientsService } from './corporate-clients.service';
import { StoreService } from '../store/store.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { Observable } from 'rxjs';

describe('CorporateClientsService', () => {
  let service: CorporateClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(CorporateClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create StoreService.dispatchCorporateClients with passed data', () => {
    const corporateData = { phone: '8445485648' };
    service.submitForm(<any>corporateData);
    expect(mockStoreService.dispatchCorporateClients).toHaveBeenCalledWith(corporateData);
  });

  it('should return stream', () => {
    expect(service.clearFormStream instanceof Observable).toBeTrue();
  });

  it('should push true to stream', (done) => {
    service.clearFormStream.subscribe((isClearForm) => {
      expect(isClearForm).toBeTrue();
      done();
    });
    service.doClearForm();
  });

  it('should return stream with state loading', () => {
    const stateLoading$ = new Observable();
    mockStoreService.corporateLoading.and.returnValue(stateLoading$);
    expect(service.getRequestLoading()).toEqual(stateLoading$);
  });
});
