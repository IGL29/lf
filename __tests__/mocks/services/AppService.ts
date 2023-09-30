import { Subject, of } from 'rxjs';

export const mockAppService = {
  startApp: jasmine.createSpy(),
  subscribeToScrollTop: jasmine.createSpy(),
  disaptchStartAction: jasmine.createSpy(),
  isMainRouteCheck: jasmine.createSpy(),
  unsubscribe: jasmine.createSpy(),
  currentUrl$: new Subject()
};
