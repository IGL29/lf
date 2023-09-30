import { TestBed } from '@angular/core/testing';

import { YmapsService } from './ymaps.service';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

describe('YmapsService', () => {
  let service: YmapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW_TOKEN,
          useFactory: () => {
            return {
              scrollTo: () => null,
              target: {
                innerWidth: 0,
                innerHeight: 0
              },
              localStorage: {
                getItem: () => null,
                setItem: () => null
              },
              innerWidth: 0,
              innerHeight: 0,
              resize: null
            };
          }
        }
      ]
    });
    service = TestBed.inject(YmapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
