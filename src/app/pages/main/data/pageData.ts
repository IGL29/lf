import { contacts } from '~data/contacts';
import { routes } from '~data/routes';
import { CATEGORY_PARAMS, EnumCategories } from '~types/product';

export const title = 'lover flower';

const links = {
  catalog: 'Смотреть каталог'
};

export const pageData = {
  hero: {
    title: title,
    slogan: 'Создаём для тех, кто ценит свежесть и изящество цветка',
    link: {
      title: 'Смотреть каталог',
      url: routes.catalog.url
    }
  },
  catalog: {
    title: 'Каталог',
    descr: {
      paragraph1: `У нас самый большой выбор цветов, букетов, открыток и подарков.
      Мы всегда поможем вам подобрать букет для вашего события, наш менеджер вас проконсультирует и поможет определиться с выбором`,
      paragraph2: `Ознакомьтесь с нашими разделами каталога`
    },
    cards: {
      flowers: {
        title: 'Цветы',
        categories: ['Сборные букеты', 'Монобукеты', 'Композиции из цветов', 'розы', 'свадебные'],
        link: {
          title: links.catalog,
          url: routes.catalog.url,
          params: [
            CATEGORY_PARAMS[EnumCategories.mono],
            CATEGORY_PARAMS[EnumCategories.roses],
            CATEGORY_PARAMS[EnumCategories.wedding],
            CATEGORY_PARAMS[EnumCategories.prefabricated]
          ]
        }
      },
      readyBouquets: {
        title: 'готовые букеты из сухоцветов',
        categories: ['букеты', 'для интерьера', 'композиции'],
        link: {
          title: links.catalog,
          url: routes.catalog.url,
          params: [
            CATEGORY_PARAMS[EnumCategories.roses],
            CATEGORY_PARAMS[EnumCategories.driedFlowers],
            CATEGORY_PARAMS[EnumCategories.chrysanthemum],
            CATEGORY_PARAMS[EnumCategories.holiday],
            CATEGORY_PARAMS[EnumCategories.interior],
            CATEGORY_PARAMS[EnumCategories.gypsophila],
            CATEGORY_PARAMS[EnumCategories.chamomile],
            CATEGORY_PARAMS[EnumCategories.compositions]
          ]
        }
      },
      additionally: {
        title: 'Дополнительно',
        categories: ['Шары', 'игрушки', 'открытки', 'упаковка'],
        link: {
          title: links.catalog,
          url: routes.catalog.url,
          params: [
            CATEGORY_PARAMS[EnumCategories.additionally],
            CATEGORY_PARAMS[EnumCategories.balloon],
            CATEGORY_PARAMS[EnumCategories.packaging],
            CATEGORY_PARAMS[EnumCategories.postcards]
          ]
        }
      }
    }
  },
  popularBouquets: {
    title: 'Популярные букеты',
    descr: 'Самые любимые композиции наших клиентов',
    link: {
      title: 'Смотреть весь каталог',
      url: routes.catalog.url
    }
  },
  howToOrder: {
    title: 'Как сделать заказ',
    list: [
      {
        title: '1 шаг',
        descr: 'Выберите какие цветы или подарки вы хотите купить'
      },
      {
        title: '2 шаг',
        descr:
          'Оформите заказ, и мы отправим вам подтверждение на электронную почту, а так же менеджер свяжется с вами по телефону или в WhatsApp'
      },
      {
        title: '3 шаг',
        descr:
          'Наши флористы бережно подойдут к созданию букета цветов в самом начале дня или накануне'
      },
      {
        title: '4 шаг',
        descr:
          'Один из наших курьеров или партнёров доставит ваш заказ по указанному адресу. Мы отправим вам сообщение в Whats App как только заказ будет доставлен'
      },
      {
        title: '5 шаг',
        descr:
          'Наслаждайтесь цветами , если вы заказали их для дома или любовью, которой поделились, если вы заказали для друга'
      }
    ]
  },
  specialOccasion: {
    title: 'особенный повод?',
    descr:
      'Мы готовы прийти на помощь и собрать уникальный букет, на любой вкус, бюджет и для любого события по вашему индивидуальному заказу.',
    list: [
      'учтем даже самые изысканные пожелания',
      'подберем свежайшие цветы и сделаем уникальный букет или композицию',
      'оплатить можно при получении или онлайн на сайте'
    ],
    link: 'собрать индивидуальный букет'
  },
  questions: {
    title: 'остались вопросы?',
    descr:
      'Отправьте ваш вопрос, заказ, предложение или жалобу через форму обратной связи, и наш специалист свяжется с вами в течение 15 минут.',
    fields: {
      name: 'Ваше имя',
      phone: '+7(977)777-77-77',
      comment: 'Ваш комментарий'
    },
    btn: 'отправить',
    confidentiality: {
      text: 'Нажимая  на кнопку «Отправить», я даю свое согласие на обработку персональных данных, в соответствии с',
      link: 'Политикой конфиденциальности'
    },
    social: contacts.social
  },
  social: {
    title: 'Наши социальные сети',
    contacts
  }
};
