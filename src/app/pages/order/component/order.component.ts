import { enterLeaveAnimation } from '~animations/enter-leave-animation';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expandAnimation } from 'src/app/animations/expand-animation';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { pageData } from '~pages/order/data/pageData';
import { Cart, ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PromocodeService } from 'src/app/services/promocode/promocode.service';
import { empty } from 'src/app/validators/empty.validator';
import { time } from 'src/app/validators/time.validator';
import { IOrderData } from './types';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandAnimation, fadeAnimation, enterLeaveAnimation]
})
export class OrderComponent implements OnInit {
  public isFormSubmitted = false;
  private _cartPrice = 0;
  private _cartDiscount = 0;
  private _promocodeDiscount = 0;
  public data = pageData;
  public minProductCount = 1;
  public totalPrice = 0;
  public deliveryPrice = 0;
  public totalDiscount = 0;
  public orderIsLoading = false;
  public selectedDeliveryMethod: string;
  private streetControlValidators = [Validators.required, empty];
  private houseControlValidators = [Validators.required, empty];
  private timeControlValidators = [Validators.required, time];

  get promocodeDiscount(): number {
    return this._promocodeDiscount;
  }
  set promocodeDiscount(value: number) {
    this._promocodeDiscount = value;
    this.setTotalDiscount();
    this.setTotalPrice();
  }

  @Input() cart: Cart | null;
  @Input() set cartDiscount(value: number) {
    this._cartDiscount = value;
    this.setTotalDiscount();
    this.setTotalPrice();
  }
  get cartDiscount() {
    return this._cartDiscount;
  }
  @Input() cartProductCount = 0;
  @Input() set cartPrice(price: number) {
    this._cartPrice = price;
    this.setTotalPrice();
  }
  get cartPrice() {
    return this._cartPrice;
  }
  @Output() emitSubmitOrderForm: EventEmitter<IOrderData> = new EventEmitter();
  @Output() emitDeleteFromCart: EventEmitter<number> = new EventEmitter();
  @Output() emitProductCountChange: EventEmitter<{
    id: number;
    count: number;
  }> = new EventEmitter();
  private orderFormData = {
    user: {
      firstName: '',
      phone: '',
      email: '',
      recipient: {
        firstName: '',
        phone: ''
      },
      comment: ''
    },
    delivery: {
      method: '',
      street: '',
      building: '',
      house: '',
      flat: '',
      time: ''
    },
    payment: ''
  };
  private deliveryFormGroup: FormGroup;
  private userFormGroup: FormGroup;
  private recipientFormGroup: FormGroup;
  public orderForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private promocodeService: PromocodeService,
    private orderService: OrderService
  ) {
    this.createOrderFormGroups();
  }

  ngOnInit(): void {
    this.deliveryMethodControl?.valueChanges.subscribe((value) => {
      this.changePriceWithDelivery(value);
      this.manageValidatorsDeliveryForm(value);
    });
    this.subscribeToOrderLoading();
    this.subscribeToPromocodeDiscount();
  }

  private createOrderFormGroups() {
    this.deliveryFormGroup = this.createDeliveryFormGroup();
    this.recipientFormGroup = this.createRecipientFormGroup();
    this.userFormGroup = this.createUserFormGroup();
    this.orderForm = this.createOrderFormGroup();
  }

  private createRecipientFormGroup() {
    return this.fb.group({
      firstName: this.orderFormData.user.recipient.firstName,
      phone: [this.orderFormData.user.recipient.phone, [Validators.minLength(11)]]
    });
  }

  private createUserFormGroup() {
    return this.fb.group({
      firstName: [this.orderFormData.user.firstName, [Validators.required, empty]],
      phone: [this.orderFormData.user.phone, [Validators.required, Validators.minLength(11)]],
      email: [this.orderFormData.user.email, [Validators.required, Validators.email]],
      recipient: this.recipientFormGroup,
      comment: [this.orderFormData.user.comment, [Validators.required, empty]]
    });
  }

  private createDeliveryFormGroup() {
    return this.fb.group({
      method: [this.orderFormData.delivery.method, [Validators.required]],
      street: [this.orderFormData.delivery.street, this.streetControlValidators],
      building: this.orderFormData.delivery.building,
      house: [this.orderFormData.delivery.house, this.houseControlValidators],
      flat: this.orderFormData.delivery.flat,
      time: [this.orderFormData.delivery.time, this.timeControlValidators]
    });
  }

  private createOrderFormGroup() {
    return this.fb.group({
      user: this.userFormGroup,
      delivery: this.deliveryFormGroup,
      payment: [this.orderFormData.payment, Validators.required]
    });
  }

  public get userNameControl() {
    return this.userFormGroup.get('firstName');
  }
  public get userPhoneControl() {
    return this.userFormGroup.get('phone');
  }
  public get userEmailControl() {
    return this.userFormGroup.get('email');
  }
  public get recipientNameControl() {
    return this.recipientFormGroup.get('firstName');
  }
  public get recipientPhoneControl() {
    return this.recipientFormGroup.get('phone');
  }
  public get deliveryMethodControl() {
    return this.deliveryFormGroup.get('method');
  }
  public get deliveryStreetControl() {
    return this.deliveryFormGroup.get('street');
  }
  public get deliveryHouseControl() {
    return this.deliveryFormGroup.get('house');
  }
  public get deliveryBuildingControl() {
    return this.deliveryFormGroup.get('building');
  }
  public get deliveryTimeControl() {
    return this.deliveryFormGroup.get('time');
  }
  public get deliveryFlatControl() {
    return this.deliveryFormGroup.get('flat');
  }
  public get paymentControl() {
    return this.orderForm.get('payment');
  }
  public get commentControl() {
    return this.userFormGroup.get('comment');
  }
  public get isDeliveryByCourier(): boolean {
    return this.deliveryMethodControl?.value === 'courier';
  }

  public changePriceWithDelivery(value: 'courier' | 'pickup'): void {
    this.deliveryPrice = this.deliveryService.getPrice(value);
    this.setTotalPrice();
  }

  private setTotalPrice(): void {
    this.totalPrice = this.deliveryPrice + this.cartPrice - this.promocodeDiscount;
  }

  private setTotalDiscount(): void {
    this.totalDiscount = this.promocodeDiscount + this.cartDiscount;
  }

  public handlerSubmitOrderForm() {
    this.isFormSubmitted = true;

    if (this.orderForm.invalid) {
      return;
    }
    this.emitSubmitOrderForm.emit(this.orderForm.value);
  }

  subscribeToPromocodeDiscount() {
    this.promocodeService.promocodeDiscount.subscribe((discount) => {
      this.promocodeDiscount = discount;
    });
  }

  subscribeToResetForm(): void {
    this.orderService.getResetFormStream().subscribe(() => this.resetOrderForm());
  }

  subscribeToOrderLoading(): void {
    this.orderService.getOrderLoading().subscribe((isLoading) => (this.orderIsLoading = isLoading));
  }

  private resetOrderForm(): void {
    this.isFormSubmitted = false;
    this.orderForm.reset();
  }

  public deleteFromCart(id: number): void {
    this.emitDeleteFromCart.emit(id);
  }

  public productCountChange(id: number, count: number): void {
    this.emitProductCountChange.emit({ id, count });
  }

  public trackByProductId(_: number, cartItem: ICartItem): number {
    return cartItem.product.id;
  }

  private manageValidatorsDeliveryForm(value: string) {
    if (value === 'courier') {
      this.deliveryStreetControl?.setValidators(this.streetControlValidators);
      this.deliveryHouseControl?.setValidators(this.houseControlValidators);
      this.deliveryTimeControl?.setValidators(this.timeControlValidators);
      this.updateValAndValidatorsDelivery();
      return;
    }
    this.deliveryStreetControl?.removeValidators(this.streetControlValidators);
    this.deliveryHouseControl?.removeValidators(this.houseControlValidators);
    this.deliveryTimeControl?.removeValidators(this.timeControlValidators);
    this.updateValAndValidatorsDelivery();
  }

  private updateValAndValidatorsDelivery() {
    this.deliveryStreetControl?.updateValueAndValidity();
    this.deliveryHouseControl?.updateValueAndValidity();
    this.deliveryTimeControl?.updateValueAndValidity();
  }
}
