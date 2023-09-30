import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pageData } from '~pages/main/data/pageData';

@Component({
  selector: 'app-social-section',
  templateUrl: './social-section.component.html',
  styleUrls: ['./social-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialSectionComponent {
  public data = pageData.social;
}
