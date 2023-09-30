import { IProduct } from '~types/product';

export const products: IProduct[] = [
  {
    id: 1,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 995,
      discount: 77
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 2,
    title: 'Соблазн',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'pink',
    flowers: ['alstroemeria', 'astilba'],
    light: 'gentle',
    format: 'bouquet',
    price: {
      value: 750,
      discount: 80
    },
    categories: ['chamomile', 'envelope', 'popular'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 3,
    title: 'Розовая симфония',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['astrance'],
    light: 'bright',
    format: 'vase',
    price: {
      value: 870,
      discount: 50
    },
    categories: ['funeral'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 4,
    title: 'Бал цветов',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'white',
    flowers: ['asparagus'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 504,
      discount: 0
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 5,
    title: 'Улыбка Фортуны',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'green',
    flowers: ['alstroemeria', 'astilba'],
    light: 'gentle',
    format: 'basket',
    price: {
      value: 420,
      discount: 0
    },
    categories: ['gifts'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 6,
    title: 'Цветочный вальс',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'red',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 654,
      discount: 321
    },
    categories: ['chamomile'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 7,
    title: 'Альпийское сияние',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'box',
    price: {
      value: 756,
      discount: 77
    },
    categories: ['holiday'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 8,
    title: 'Вопреки канонам',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'yellow',
    flowers: ['anthurium', 'asparagus'],
    light: 'bright',
    format: 'vase',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['compositions'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 9,
    title: 'Цветочный микрокосмос',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['indoor'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 10,
    title: 'Огненная радуга',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['astrance', 'astilba'],
    light: 'gentle',
    format: 'basket',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 11,
    title: 'Парижский шик',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['packaging'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 12,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['popular'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 13,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['popular'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 14,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'pink',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['interior'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 15,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['astrance', 'astilba'],
    light: 'gentle',
    format: 'vase',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['popular'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 16,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'green',
    flowers: ['asparagus'],
    light: 'bright',
    format: 'hatbox',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['popular'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 17,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 18,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 19,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 750,
      discount: 40
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 20,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 500,
      discount: 0
    },
    categories: ['balloon'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 21,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['balloon'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 22,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 700,
      discount: 45
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 23,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 77
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 24,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 777,
      discount: 0
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 25,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'white',
    flowers: ['alstroemeria', 'astilba'],
    light: 'bright',
    format: 'bouquet',
    price: {
      value: 810,
      discount: 30
    },
    categories: ['additionally'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
    isNew: true
  },
  {
    id: 26,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'yellow',
    flowers: ['alstroemeria', 'astilba'],
    light: 'gentle',
    format: 'bouquet',
    price: {
      value: 340,
      discount: 0
    },
    categories: ['additionally', 'balloon'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  },
  {
    id: 27,
    title: 'Рубиновые искры',
    images: {
      main: '/assets/images/flowers/flower-1.jpg',
      other: [
        '/assets/images/flowers/flower-2.jpg',
        '/assets/images/flowers/flower-3.jpg',
        '/assets/images/flowers/flower-2.jpg'
      ]
    },
    color: 'orange',
    flowers: ['alstroemeria', 'anthurium'],
    light: 'bright',
    format: 'basket',
    price: {
      value: 470,
      discount: 30
    },
    categories: ['additionally', 'envelope'],
    rating: 4.5,
    descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
  }
];
