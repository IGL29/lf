const title = 'оформление заказа';

const breadcrumbs = [
  {
    title: 'Главная',
    url: '/'
  },
  {
    title: title
  }
];

export const pageData = {
  breadcrumbs,
  title,
  subtitle: 'Оформление заказа',
  formTitle: 'Контактные данные',
  fields: {
    name: {
      title: 'Ваше имя',
      descr: 'Введите ваше имя'
    },
    phone: {
      title: 'Ваш телефон',
      descr: '+7 (977) 777-77-77'
    },
    email: {
      title: 'Ваш e-mail',
      descr: 'Введите вашу почту'
    },
    recipientPhone: {
      title: 'Телефон получателя (необязательно)',
      descr: '+7 (977) 777-77-77'
    },
    recipientName: {
      title: 'Имя получателя (необязательно)',
      descr: 'Введите имя получателя'
    },
    comment: {
      title: 'Комментарий к заказу',
      descr: 'Примечания к вашеу заказу,  особые пожелания отделу доставки'
    },
    delivery: {
      title: 'Доставка',
      courier: 'Доставка курьером',
      self: 'Самовывоз'
    },
    street: {
      title: 'Улица',
      descr: 'Введите улицу'
    },
    building: {
      title: 'Корп/стр (необязательно)',
      descr: 'Корп/стр'
    },
    house: {
      title: 'Дом',
      descr: 'Дом'
    },
    apartment: {
      title: 'Кв/офис (необязательно)',
      descr: 'Кв/офис'
    },
    deliveryTime: {
      title: 'Время доставки',
      descr: 'Время доставки',
      shippingCost: 'Стоимость доставки'
    },
    payment: {
      title: 'Оплата',
      list: [
        'банковская карта',
        'Наличными',
        'Apple pay',
        'google pay',
        'Криптовалюта',
        'С расчетного счета'
      ]
    },
    promo: {
      title: 'Промокод',
      descr: 'Промокод',
      btn: 'Применить'
    },
    totalAmount: {
      title: 'Общая сумма заказа',
      discount: 'Скидка',
      delivery: 'Доставка'
    },
    btn: 'К оплате',
    text: {
      part1:
        'Нажимая  на кнопку «К Оплате», я даю свое согласие на обработку персональных данных, в соответствии с',
      part2: 'Политикой конфиденциальности',
      part3: ', а так же ознакомлен с условиями оплаты и доставки'
    }
  }
};
