import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StoreService } from './store/store.service';
import { TransferState } from '@angular/platform-browser';
import { PRODUCTS_STORE_TRANSFER_KEY } from '../store/products/products.reducer';
import { PRODUCT_STORE_TRANSFER_KEY } from '~pages/product/store/product/product.reducer';
import { productStore } from '~pages/product/store/product';
import { productsStore } from '../store/products';
import { Observable } from 'rxjs';
import { IS_PLATFORM_BROWSER_TOKEN } from '../tokens/isPlatformBrowser';
import { IS_PLATFORM_SERVER_TOKEN } from '../tokens/isPlatformServer';

@Injectable({
  providedIn: 'root'
})
export class HydrationStoreService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(IS_PLATFORM_BROWSER_TOKEN) private isPlatformBrowserFn: (id: string) => boolean,
    @Inject(IS_PLATFORM_SERVER_TOKEN) private isPlatformServerFn: (id: string) => boolean,
    private transferState: TransferState,
    private storeService: StoreService
  ) {}

  public transferProductsStore(): void {
    if (this.isPlatformServerFn(this.platformId)) {
      this.storeService.getRootStore().subscribe((store) => {
        this.transferState.set(PRODUCTS_STORE_TRANSFER_KEY, store[productsStore.FEATURE_KEY]);
      });
    }
  }

  public transferProductStore(): void {
    if (this.isPlatformServerFn(this.platformId)) {
      this.storeService.getRootStore().subscribe((store) => {
        this.transferState.set(PRODUCT_STORE_TRANSFER_KEY, store[productStore.FEATURE_KEY]);
      });
    }
  }

  public isExistTransferedProductsStore(): boolean {
    return this.transferState.hasKey(PRODUCTS_STORE_TRANSFER_KEY);
  }

  public isExistTransferedProductStore(): boolean {
    return this.transferState.hasKey(PRODUCT_STORE_TRANSFER_KEY);
  }

  public getTransferProductsStore(): productsStore.IState {
    return this.transferState.get(PRODUCTS_STORE_TRANSFER_KEY, productsStore.initialState);
  }

  public getTransferProductStore(): productStore.IState {
    return this.transferState.get(PRODUCT_STORE_TRANSFER_KEY, productStore.initialState);
  }

  public isTransferedProducts(): Observable<boolean> {
    return this.storeService.isHydrateProducts();
  }

  public isTransferedProduct(): Observable<boolean> {
    return this.storeService.isHydrateProduct();
  }

  get isPlatformServer(): boolean {
    return this.isPlatformServerFn(this.platformId);
  }

  get isPlatformBrowser(): boolean {
    return this.isPlatformBrowserFn(this.platformId);
  }
}
