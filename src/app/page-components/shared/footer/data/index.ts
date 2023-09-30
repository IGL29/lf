import { contactsBlock } from '~data/contactsBlock';
import { categories } from '~data/product';
import { routes } from '~data/routes';

const requisites = {
  title: 'реквизиты',
  descr:
    'ООО «Ловефлове» 220035, Республика Беларусь, г. Минск, ул. Тимирязева д. 67, комн. 112 (пом.11) УНП 193263781, р/с BY55MTBK30120001093300096372 ЗАО «МТБанк», БИК MTBKBY22 220007, г. Минск, улица Толстого'
};

const catalog = {
  title: 'Каталог',
  categories: categories.slice(0, 11)
};

export const footer = {
  requisites,
  catalog,
  nav: {
    delivery: routes.delivery,
    about: routes.about,
    faq: routes.faq,
    contacts: routes.contacts,
    corporateClients: {
      title: 'Для корпоративных клиентов',
      url: 'corporate-clients'
    }
  },
  contactsBlock
};
