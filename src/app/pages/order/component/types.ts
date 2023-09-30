export interface IOrderData {
  user: {
    firstName: string;
    phone: string;
    email: string;
    recipient: {
      firstName: string;
      phone: string;
    };
    comment: string;
  };
  delivery: {
    [K in keyof IDelivery]: IDelivery[K];
  };
  payment: Payment | '';
}

export interface IDelivery {
  method: 'courier' | 'pickup';
  time: string;
}

export interface IAddress {
  city: 'minsk' | 'gomel';
  street: string;
  building: string;
  house: string;
  flat: string;
}

export type Payment =
  | 'card'
  | 'cash'
  | 'applePay'
  | 'googlePay'
  | 'cryptoCurrency'
  | 'checkingAccount';
