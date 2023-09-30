import { IProduct } from '~types/product';

export const getMockProduct: (args?: Partial<IProduct>) => IProduct = ({
  id = 2,
  title = 'Рубиновые искры',
  images = {
    main: '/assets/images/flowers/flower-1.jpg',
    other: [
      '/assets/images/flowers/flower-2.jpg',
      '/assets/images/flowers/flower-3.jpg',
      '/assets/images/flowers/flower-2.jpg'
    ]
  },
  color = 'pink',
  flowers = <any>['alstroemeria', 'astilba'],
  light = 'gentle',
  format = 'bouquet',
  price = {
    value: 750,
    discount: 80
  },
  categories = <any>['chamomile', 'envelope', 'popular'],
  rating = 4.5,
  descr = 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета',
  isNew
} = {}) => ({
  id,
  title,
  images,
  color,
  flowers,
  light,
  format,
  price,
  categories,
  rating,
  descr,
  isNew
});

export const mockProduct: IProduct = {
  id: 5,
  title: 'Розы',
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
  descr: 'Завораживающая глубина ваших чувств передана огненными красками\n      этого букета'
};
