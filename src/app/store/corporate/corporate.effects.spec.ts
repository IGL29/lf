import { TestBed } from '@angular/core/testing';
import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './corporate.actions';
import { getMockApiCorporateService } from '__tests__/mocks/services/ApiCorporateService';
import { ApiCorporateService } from 'src/app/services/api/api-corporate/api-corporate.service';
import { CorporateEffects } from './corporate.effects';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CorporateClientsService } from 'src/app/services/corporate/corporate-clients.service';
import { mockCorporateClientsService } from '__tests__/mocks/services/CorporateClientsService';

describe(`${ENTITY}`, () => {
  let apiCorporateService: ReturnType<typeof getMockApiCorporateService>;
  let corporateClientService: typeof mockCorporateClientsService;
  let actions$: Observable<Action>;
  let effects: CorporateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CorporateEffects,
        {
          provide: ApiCorporateService,
          useValue: getMockApiCorporateService()
        },
        {
          provide: CorporateClientsService,
          useValue: mockCorporateClientsService
        },
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(CorporateEffects);
    apiCorporateService = TestBed.inject(ApiCorporateService);
    corporateClientService = TestBed.inject(CorporateClientsService);
  });

  it('should dispatch requestSuccessAction', (done) => {
    actions$ = of(requestAction(<any>{}));
    apiCorporateService.postRequest.and.returnValue(of({}));
    effects.postFeedback$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestSuccessAction());
      done();
    });
  });

  it('should call corporateClientsService.doClearForm', (done) => {
    actions$ = of(requestAction(<any>{}));
    apiCorporateService.postRequest.and.returnValue(of({}));
    effects.postFeedback$.subscribe(() => {
      expect(corporateClientService.doClearForm).toHaveBeenCalled();
      done();
    });
  });

  it('should dispatch requestErrorAction', (done) => {
    actions$ = of(requestAction(<any>{}));
    apiCorporateService.postRequest.and.returnValue(throwError(() => 'some error'));

    effects.postFeedback$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestErrorAction({ error: 'some error' }));
      done();
    });
  });
});
