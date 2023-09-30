import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { FakeHttpClientService } from '../fake/fake-http-client/fake-http-client.service';

const mockFakeHttpClientService = jasmine.createSpyObj(['get', 'post']);

const url = 'http://localhost:3000/products';
const options = { queryParams: { category: 'balloon' } };

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        { provide: FakeHttpClientService, useValue: mockFakeHttpClientService }
      ]
    });

    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called http.get with url and options', () => {
    service.get(url, options);
    expect(mockFakeHttpClientService.get).toHaveBeenCalledWith(url, options);
  });

  it('should be called http.get with url', () => {
    service.get(url);
    expect(mockFakeHttpClientService.get).toHaveBeenCalledWith(url, {});
  });

  it('should be called http.post with url and options', () => {
    service.post(url, options);
    expect(mockFakeHttpClientService.post).toHaveBeenCalledWith(url, options);
  });
});
