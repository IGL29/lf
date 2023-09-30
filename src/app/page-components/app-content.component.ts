import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppContentComponent {
  @Input() isMainRoute: boolean;
}
