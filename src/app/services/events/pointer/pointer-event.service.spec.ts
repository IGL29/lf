import { TestBed } from '@angular/core/testing';

import { PointerEventService } from './pointer-event.service';
import { Observable } from 'rxjs';

describe('PointerEventService', () => {
  let service: PointerEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointerEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return object with pointer position', () => {
    const pointerEvent = { pointerType: 'mouse', clientX: 200, clientY: 500 };
    expect(service['getPointerPosition'](<any>pointerEvent)).toEqual(pointerEvent);
  });

  it('should return stream', () => {
    expect(service.pointermoveObservable$ instanceof Observable).toBeTrue();
  });

  it('should complete stream', () => {
    const completeHandler = jasmine.createSpy();
    service.pointermoveObservable$.subscribe({ complete: completeHandler });
    service.destroy();
    expect(completeHandler).toHaveBeenCalled();
  });
});
