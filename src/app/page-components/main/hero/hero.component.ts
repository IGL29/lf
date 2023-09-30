import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pageData } from '~pages/main/data/pageData';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  public data = pageData.hero;
}
