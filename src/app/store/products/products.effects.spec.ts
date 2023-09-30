import { getMockProduct } from '__tests__/mocks/data/product';
import { TestBed } from '@angular/core/testing';
import { ApiProductService } from 'src/app/services/api/api-product/api-product.service';
import { ProductsEffects } from './products.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './products.actions';
import { getMockApiProductsService } from '__tests__/mocks/services/ApiProductsService';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { HydrationStoreService } from 'src/app/services/hydration-store.service';
import { mockHydrationStoreService } from '__tests__/mocks/services/HydrationStoreService';
import { IS_PLATFORM_SERVER_TOKEN } from 'src/app/tokens/isPlatformServer';

describe(`${ENTITY} Effects`, () => {
  let effects: ProductsEffects;
  let actions$: Observable<Action> = new Observable<Action>();
  let initialState = {};
  let metadata: EffectsMetadata<ProductsEffects>;
  let store: MockStore;
  let apiProductsService: ReturnType<typeof getMockApiProductsService>;
  let hydrationStoreServiceService: typeof mockHydrationStoreService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiProductService,
          useValue: getMockApiProductsService()
        },
        {
          provide: HydrationStoreService,
          useValue: mockHydrationStoreService
        },
        {
          provide: IS_PLATFORM_SERVER_TOKEN,
          useValue: (id: string) => false
        },
        provideMockActions(() => actions$),
        provideMockStore(initialState),
        ProductsEffects
      ]
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(ProductsEffects);
    metadata = getEffectsMetadata(effects);
    apiProductsService = TestBed.inject(ApiProductService);
    hydrationStoreServiceService = TestBed.inject(HydrationStoreService);
  });

  it('should dispatch requestSuccessAction', (done) => {
    actions$ = of(requestAction());
    mockHydrationStoreService['isTransferedProducts'].and.returnValue(of(false));
    apiProductsService.getProducts.and.returnValue(of([getMockProduct(), getMockProduct()]));

    effects.loadProducts$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        requestSuccessAction({ products: [getMockProduct(), getMockProduct()] })
      );
      done();
    });
  });

  it('should dispatch requestErrorAction', (done) => {
    hydrationStoreServiceService['isTransferedProducts'].and.returnValue(of(false));
    actions$ = of(requestAction());
    apiProductsService.getProducts.and.returnValue(throwError(() => 'some error'));

    effects.loadProducts$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestErrorAction({ error: 'some error' }));
      done();
    });
  });
});
