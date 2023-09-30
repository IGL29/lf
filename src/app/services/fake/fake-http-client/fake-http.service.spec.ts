import { TestBed } from '@angular/core/testing';

import { FakeHttpClientService } from './fake-http-client.service';

describe('FakeHttpService', () => {
  let service: FakeHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
