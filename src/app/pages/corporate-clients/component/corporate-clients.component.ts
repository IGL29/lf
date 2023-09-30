import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBreadcrumb } from '~components/breadcrumbs/types';
import { ICorporateUser } from './types';
import { empty } from 'src/app/validators/empty.validator';

@Component({
  selector: 'app-corporate-clients',
  templateUrl: './corporate-clients.component.html',
  styleUrls: ['./corporate-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorporateClientsComponent {
  public isFormSubmitted = false;
  @Input() breadcrumbs: IBreadcrumb[];
  @Input() set corporateUserData(data: ICorporateUser) {
    this.corporateFormGroup.setValue(data);
  }
  @Input() isLoading: boolean | null;
  @Output() emitSubmitForm: EventEmitter<ICorporateUser> = new EventEmitter();

  private corporateFormData: ICorporateUser = {
    corporateName: '',
    postalAddress: '',
    name: '',
    phone: '',
    bouquetPrice: '',
    email: '',
    unp: '',
    paymentAccount: '',
    bankCode: '',
    numberRequestsMonth: ''
  };
  public corporateFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.corporateFormGroup = this.initCorporateFormGroup();
  }

  private initCorporateFormGroup() {
    return this.fb.group({
      corporateName: [this.corporateFormData.corporateName, [Validators.required, empty]],
      postalAddress: [this.corporateFormData.postalAddress, [Validators.required, empty]],
      name: [this.corporateFormData.name, [Validators.required, empty]],
      phone: [this.corporateFormData.phone, [Validators.required, Validators.minLength(11)]],
      bouquetPrice: [this.corporateFormData.bouquetPrice, [Validators.required, empty]],
      email: [this.corporateFormData.email, [Validators.required, Validators.email]],
      unp: [this.corporateFormData.unp, [Validators.required, Validators.minLength(9)]],
      paymentAccount: [
        this.corporateFormData.paymentAccount,
        [Validators.required, Validators.minLength(20)]
      ],
      bankCode: [this.corporateFormData.bankCode, [Validators.required, Validators.minLength(9)]],
      numberRequestsMonth: [
        this.corporateFormData.numberRequestsMonth,
        [Validators.required, empty]
      ]
    });
  }

  public get corporateNameControl() {
    return this.corporateFormGroup.get('corporateName');
  }
  public get postalAddressControl() {
    return this.corporateFormGroup.get('postalAddress');
  }
  public get nameControl() {
    return this.corporateFormGroup.get('name');
  }
  public get phoneControl() {
    return this.corporateFormGroup.get('phone');
  }
  public get bouquetPriceControl() {
    return this.corporateFormGroup.get('bouquetPrice');
  }
  public get emailControl() {
    return this.corporateFormGroup.get('email');
  }
  public get unpControl() {
    return this.corporateFormGroup.get('unp');
  }
  public get paymentAccountControl() {
    return this.corporateFormGroup.get('paymentAccount');
  }
  public get bankCodeControl() {
    return this.corporateFormGroup.get('bankCode');
  }
  public get numberRequestControl() {
    return this.corporateFormGroup.get('numberRequestsMonth');
  }

  public resetForm(): void {
    this.corporateFormGroup.reset();
    this.isFormSubmitted = false;
  }

  public handlerFormSubmit(): void {
    this.isFormSubmitted = true;

    if (this.corporateFormGroup.invalid) {
      return;
    }
    this.emitSubmitForm.emit(this.corporateFormGroup.value);
  }
}
