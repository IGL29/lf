import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Height, Icon, Width } from './types';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() icon: Icon;
  @Input() width: Width;
  @Input() height: Height;
  @Input() viewBox: string;
  @Input() pathFill: string;
}
