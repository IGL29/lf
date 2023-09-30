import { Params } from '@angular/router';

export interface IBreadcrumb {
  title: string;
  url?: string;
  params?: Params;
}
