import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBreadcrumb } from './types';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {
  @Input() links: IBreadcrumb[];
}
