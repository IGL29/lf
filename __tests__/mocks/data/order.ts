import { IOrderData } from '~pages/order/component/types';

export const getMockOrderUser = (): IOrderData['user'] => ({
  comment: 'text',
  email: 'example@test.com',
  firstName: 'name',
  phone: '+746546545',
  recipient: {
    firstName: 'recipient name',
    phone: '+746546545'
  }
});
