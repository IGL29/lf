import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { FeedbackEffects } from './feedback.effects';
import { mockFeedbackService } from '__tests__/mocks/services/FeedbackService';
import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './feedback.actions';
import { TestBed } from '@angular/core/testing';
import { ApiFeedbackService } from 'src/app/services/api/api-feedback/api-feedback.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { getMockApiFeedbackService } from '__tests__/mocks/services/ApiFeedbackService';

describe(`${ENTITY}`, () => {
  let apiFeedbackService: ReturnType<typeof getMockApiFeedbackService>;
  let feedbackService: typeof mockFeedbackService;
  let actions$: Observable<Action>;
  let effects: FeedbackEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackEffects,
        {
          provide: ApiFeedbackService,
          useValue: getMockApiFeedbackService()
        },
        {
          provide: FeedbackService,
          useValue: mockFeedbackService
        },
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(FeedbackEffects);
    apiFeedbackService = TestBed.inject(ApiFeedbackService);
    feedbackService = TestBed.inject(FeedbackService);
  });

  it('should dispatch requestSuccessAction', (done) => {
    actions$ = of(
      requestAction({ comment: 'comment text', name: 'name text', phone: '75468454564' })
    );
    apiFeedbackService.postFeedback.and.returnValue(of({}));
    effects.postFeedback$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestSuccessAction());
      done();
    });
  });

  it('should call feedbackService.doClearForm', (done) => {
    actions$ = of(requestAction(<any>{}));
    apiFeedbackService.postFeedback.and.returnValue(of({}));
    effects.postFeedback$.subscribe(() => {
      expect(feedbackService.doClearForm).toHaveBeenCalled();
      done();
    });
  });

  it('should dispatch requestErrorAction', (done) => {
    actions$ = of(requestAction(<any>{}));
    apiFeedbackService.postFeedback.and.returnValue(throwError(() => 'some error'));

    effects.postFeedback$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestErrorAction({ error: 'some error' }));
      done();
    });
  });
});
