import { Subject } from 'rxjs';

export type mockViewportSizeService = Record<string, any>;

export const getMockViewportSizeService = () => ({
  getSizesFromResizeEvent: jasmine.createSpy(),
  destroy: jasmine.createSpy(),
  resizeObservable$: new Subject()
});

export const sizesData = { width: 1200, height: 1000 };
