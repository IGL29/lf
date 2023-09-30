import { HydrationStoreService } from 'src/app/services/hydration-store.service';

export const mockHydrationStoreService: Record<string, any> = {
  isTransferedProducts: jasmine.createSpy(),
  isTransferedProduct: jasmine.createSpy()
};
