import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { description } from './data/meta';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
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
