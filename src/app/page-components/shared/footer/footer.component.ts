import { ChangeDetectionStrategy, Component } from '@angular/core';
import { footer } from './data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  public data = footer;
}
