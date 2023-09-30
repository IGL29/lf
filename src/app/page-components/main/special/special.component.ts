import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pageData } from '~pages/main/data/pageData';

@Component({
  selector: 'app-special-section',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialComponent {
  public data = pageData.specialOccasion;
}
