import { Params } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

export const mockActivatedRoute = {
  queryParams: new BehaviorSubject<Params>({}),
  snapshot: {
    queryParams: <Record<string, any>>{}
  },
  data: of([])
};
