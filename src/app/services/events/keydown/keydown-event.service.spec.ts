import { TestBed } from '@angular/core/testing';
import { KeydownEventService } from './keydown-event.service';

describe('KeydownEventService', () => {
  let service: KeydownEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeydownEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value of key', () => {
    const key = 'Shift';
    expect(service['getKey'](<any>{ key })).toBe(key);
  });

  it('should complete stream', () => {
    const completeHandler = jasmine.createSpy();
    service.keydownObservable$.subscribe({ complete: completeHandler });
    service.destroy();
    expect(completeHandler).toHaveBeenCalled();
  });
});
