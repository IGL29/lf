import { address } from './address';
import { contacts } from './contacts';

export const contactsBlock = {
  email: {
    contact: contacts.email,
    descr: 'Доставка 24/7 по договоренности с оператором'
  },
  address,
  social: contacts.social,
  phone: {
    phone: contacts.phone,
    descr: 'заказать звонок'
  }
};
