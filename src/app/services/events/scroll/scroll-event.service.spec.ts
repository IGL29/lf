import { TestBed } from '@angular/core/testing';

import { ScrollEventService } from './scroll-event.service';
import { Observable } from 'rxjs';

describe('ScrollEventService', () => {
  let service: ScrollEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return stream', () => {
    expect(service.scrollObservable$ instanceof Observable).toBeTrue();
  });

  it('should be called next and complete', () => {
    service['_destroySubject']['complete'] = jasmine.createSpy();
    service.destroy();
    expect(service['_destroySubject'].complete).toHaveBeenCalled();
  });
});
