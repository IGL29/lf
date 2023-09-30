import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { mockLocalStorage } from '__tests__/mocks/browserApi/localStorage';
import { LOCAL_STORAGE_TOKEN } from 'src/app/tokens/localStorage';

describe('StorageService', () => {
  let service: StorageService;
  const key = 'cart';
  const value = [{ id: 1, name: 'someName' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: mockLocalStorage
        }
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called storage.setItem with correctly arguments', () => {
    service.setItem(key, value);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should be called storage.clear', () => {
    service.clearStorage();
    expect(mockLocalStorage.clear).toHaveBeenCalled();
  });

  it('should be return correctly value', () => {
    mockLocalStorage.getItem.and.returnValue(JSON.stringify(value));
    expect(service.getItem(key)).toEqual(value);
  });

  it('should be return null', () => {
    mockLocalStorage.getItem.and.returnValue(null);
    expect(service.getItem(key)).toBe(null);
  });

  it('should be called storage.removeItem with key', () => {
    service.removeItem(key);
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
  });
});
