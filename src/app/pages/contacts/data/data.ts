import { contacts } from '../../../../data/contacts';
import { address } from '../../../../data/address';

const breadcrumbs = [
  {
    title: 'Главная',
    url: '/'
  },
  {
    title: 'Контакты'
  }
];

export const pageData = {
  title: 'контакты',
  breadcrumbs,
  contactsSection: {
    time: {
      title: 'Время работы',
      descr: `${address.workTime} ${address.weekends}`
    },
    address: {
      title: 'Адрес',
      descr: address.street
    },
    phone: {
      title: 'Телефон',
      descr: contacts.phone
    },
    email: {
      title: 'E-mail',
      descr: contacts.email
    }
  },
  feedback: {
    title: {
      part1: 'Напишите',
      part2: 'Нам'
    }
  },
  map: {
    title: 'Мы на карте'
  }
};
