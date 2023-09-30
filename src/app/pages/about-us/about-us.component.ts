import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { pageData } from '~pages/about-us/data/pageData';
import { description } from './data/meta';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
  public data = pageData;

  constructor(private meta: Meta) {
    this.setMeta();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }
}
