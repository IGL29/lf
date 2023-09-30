import { Subject } from 'rxjs';

export const mockUrlRouteService: Record<string, any> = {
  isChangedUrlStream$: new Subject(),
  currentUrlStream$: new Subject()
};
