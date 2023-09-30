import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-field',
  templateUrl: './error-field.component.html',
  styleUrls: ['./error-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorFieldComponent {
  @Input() ariaDescribedby: string;
  @Input() isRequired: boolean;
  @Input() isRequiredRadio: boolean;
  @Input() isEmpty: boolean;
  @Input() isInvalidPhone: boolean;
  @Input() isInvalidEmail: boolean;
  @Input() isInvalidUNP: boolean;
  @Input() isInvalidAccount: boolean;
  @Input() isInvalidBankCode: boolean;
  @Input() isInvalidTime: boolean;
}
