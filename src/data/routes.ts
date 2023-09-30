export interface IRouteData {
  title: string;
  url: string;
}

export const routes = {
  catalog: {
    title: 'Каталог',
    url: '/catalog'
  },
  delivery: {
    title: 'Доставка и оплата',
    url: '/delivery-payment'
  },
  about: {
    title: 'О нас',
    url: '/about-us'
  },
  contacts: {
    title: 'Контакты',
    url: '/contacts'
  },
  faq: {
    title: 'FAQ',
    url: '/faq'
  }
};

export const mainRoute = {
  title: 'Главная',
  url: '/'
};
