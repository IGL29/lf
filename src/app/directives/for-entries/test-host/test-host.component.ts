import { Component } from '@angular/core';
import { ForEntriesModule } from '../for-entries.module';

@Component({
  template: `<ul>
    <li *appForEntries="let entry of object" data-test="item" [attr.data-entry]="entry.name">
      {{ entry.value }}
    </li>
  </ul>`,
  standalone: true,
  imports: [ForEntriesModule]
})
export class TestHostComponent {
  object: Record<string, number | string> = {
    title: 'Some title',
    price: 7000
  };
}
