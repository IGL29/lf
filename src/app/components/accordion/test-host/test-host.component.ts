import { Component, Input } from '@angular/core';

@Component({
  template: ` <app-accordion data-test="accordion" [isOpen]="isOpen">
    <button slot="button" data-test="button-content">{{ buttonValue }}</button>

    <ng-template #bodyContent>
      <p data-test="content">{{ contentValue }}</p>
    </ng-template>
  </app-accordion>`
})
export class TestHostComponent {
  public isOpen = true;
  @Input() contentValue: string;
  @Input() buttonValue: string;
}
