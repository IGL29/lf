import { Rating, RatingNotSet } from '~components/rating/types';

export interface IProduct {
  id: number;
  title: string;
  images: IImages;
  price: IPrice;
  categories: Array<Categories>;
  rating: ProductRating;
  descr: string;
  light: Light;
  color: Color;
  format: Format;
  flowers: Array<Flower>;
  isNew?: IsNew;
}

type IsNew = boolean | null;

export enum EnumProductFeature {
  price,
  light,
  color,
  format,
  flower
}

export const PRODUCT_FEATURE_NAME = <const>{
  [EnumProductFeature.price]: 'стоимость',
  [EnumProductFeature.light]: 'по свету',
  [EnumProductFeature.color]: 'по цвету',
  [EnumProductFeature.format]: 'по формату',
  [EnumProductFeature.flower]: 'по цветку'
};

export type ProductFeature = keyof typeof EnumProductFeature;
export type ProductFeatureName =
  (typeof PRODUCT_FEATURE_NAME)[(typeof EnumProductFeature)[keyof typeof EnumProductFeature]];

export type ProductRating = Rating | RatingNotSet;
export type ProductImage = string;

export interface IPrice {
  value: number;
  discount: number;
}

export interface IImages {
  main: ProductImage;
  other: ProductImage[];
}

export enum EnumFlower {
  alstroemeria,
  anthurium,
  asparagus,
  astilba,
  astrance
}

export const FLOWER_NAME = <const>{
  [EnumFlower.alstroemeria]: 'Альстромерия',
  [EnumFlower.anthurium]: 'Антуриум',
  [EnumFlower.asparagus]: 'Аспарагус',
  [EnumFlower.astilba]: 'Астильба',
  [EnumFlower.astrance]: 'Астранция'
};

export const FLOWER_PARAMS = <const>{
  [EnumFlower.alstroemeria]: 'alstroemeria',
  [EnumFlower.anthurium]: 'anthurium',
  [EnumFlower.asparagus]: 'asparagus',
  [EnumFlower.astilba]: 'astilba',
  [EnumFlower.astrance]: 'astrance'
};

export type Flower = keyof typeof EnumFlower;
export type FlowerName = (typeof FLOWER_NAME)[keyof typeof FLOWER_NAME];
export type FlowerParams = (typeof FLOWER_PARAMS)[keyof typeof FLOWER_PARAMS];

export enum EnumFormat {
  bouquet,
  vase,
  envelope,
  basket,
  hatbox,
  box
}

export const FORMAT_NAME = <const>{
  [EnumFormat.bouquet]: 'Букет',
  [EnumFormat.vase]: 'В вазе',
  [EnumFormat.envelope]: 'В конверте',
  [EnumFormat.basket]: 'В корзине',
  [EnumFormat.hatbox]: 'В шляпной коробке',
  [EnumFormat.box]: 'В ящике'
};

export const FORMAT_PARAMS = <const>{
  [EnumFormat.bouquet]: 'bouquet',
  [EnumFormat.vase]: 'vase',
  [EnumFormat.envelope]: 'envelope',
  [EnumFormat.basket]: 'basket',
  [EnumFormat.hatbox]: 'hatbox',
  [EnumFormat.box]: 'box'
};

export type Format = keyof typeof EnumFormat;
export type FormatName = (typeof FORMAT_NAME)[keyof typeof FORMAT_NAME];
export type FormatParams = (typeof FORMAT_PARAMS)[keyof typeof FORMAT_PARAMS];

export enum EnumColor {
  white,
  yellow,
  green,
  red,
  orange,
  pink
}

export const COLOR_NAME = <const>{
  [EnumColor.white]: 'Белый',
  [EnumColor.yellow]: 'Желтый',
  [EnumColor.green]: 'Зеленый',
  [EnumColor.red]: 'Красный',
  [EnumColor.orange]: 'Оранжевый',
  [EnumColor.pink]: 'Розовый'
};

export const COLOR_PARAMS = <const>{
  [EnumColor.white]: 'white',
  [EnumColor.yellow]: 'yellow',
  [EnumColor.green]: 'green',
  [EnumColor.red]: 'red',
  [EnumColor.orange]: 'orange',
  [EnumColor.pink]: 'pink'
};

export type Color = keyof typeof EnumColor;
export type ColorName = (typeof COLOR_NAME)[keyof typeof COLOR_NAME];
export type ColorParams = (typeof COLOR_PARAMS)[keyof typeof COLOR_PARAMS];

export enum EnumLight {
  gentle,
  bright
}
export const LIGHT_NAME = <const>{
  [EnumLight.gentle]: 'Нежный',
  [EnumLight.bright]: 'Яркий'
};

export const LIGHT_PARAMS = <const>{
  [EnumLight.gentle]: 'gentle',
  [EnumLight.bright]: 'bright'
};

export type Light = keyof typeof EnumLight;
export type LightName = (typeof LIGHT_NAME)[keyof typeof LIGHT_NAME];
export type LightParams = (typeof LIGHT_PARAMS)[keyof typeof LIGHT_PARAMS];

export enum EnumPrice {
  price
}
export const PRICE_NAME = <const>{
  [EnumPrice.price]: 'цена'
};

export type Price = keyof typeof EnumPrice;
export type PriceName = (typeof PRICE_NAME)[keyof typeof PRICE_NAME];

export enum EnumCategories {
  gypsophila,
  chamomile,
  chrysanthemum,
  indoor,
  mono,
  prefabricated,
  holiday,
  compositions,
  envelope,
  postcards,
  gifts,
  driedFlowers,
  balloon,
  popular,
  roses,
  funeral,
  packaging,
  wedding,
  interior,
  autumn,
  individual,
  additionally
}

export const CATEGORY_PARAMS = <const>{
  [EnumCategories.gypsophila]: 'gypsophila',
  [EnumCategories.chamomile]: 'chamomile',
  [EnumCategories.chrysanthemum]: 'chrysanthemum',
  [EnumCategories.indoor]: 'indoor',
  [EnumCategories.mono]: 'mono',
  [EnumCategories.holiday]: 'holiday',
  [EnumCategories.compositions]: 'compositions',
  [EnumCategories.envelope]: 'envelope',
  [EnumCategories.postcards]: 'postcards',
  [EnumCategories.gifts]: 'gifts',
  [EnumCategories.driedFlowers]: 'driedFlowers',
  [EnumCategories.balloon]: 'balloon',
  [EnumCategories.popular]: 'popular',
  [EnumCategories.roses]: 'roses',
  [EnumCategories.funeral]: 'funeral',
  [EnumCategories.packaging]: 'packaging',
  [EnumCategories.wedding]: 'wedding',
  [EnumCategories.interior]: 'interior',
  [EnumCategories.individual]: 'individual',
  [EnumCategories.additionally]: 'additionally',
  [EnumCategories.autumn]: 'autumn',
  [EnumCategories.prefabricated]: 'prefabricated'
};

export const CATEGORY_NAME = <const>{
  [EnumCategories.gypsophila]: 'Букеты из гипсофил',
  [EnumCategories.chamomile]: 'Букеты из ромашек',
  [EnumCategories.chrysanthemum]: 'Букеты из хризантем',
  [EnumCategories.indoor]: 'Комнатные цветы в горшках',
  [EnumCategories.mono]: 'Монобукеты',
  [EnumCategories.holiday]: 'Букеты на праздник',
  [EnumCategories.compositions]: 'Композиции из букетов',
  [EnumCategories.envelope]: 'Конверты',
  [EnumCategories.postcards]: 'Откытки',
  [EnumCategories.gifts]: 'Подарки',
  [EnumCategories.driedFlowers]: 'Букеты из сухоцветов',
  [EnumCategories.balloon]: 'Шары',
  [EnumCategories.popular]: 'Популярное',
  [EnumCategories.roses]: 'Букеты роз',
  [EnumCategories.funeral]: 'Цветы на похороны',
  [EnumCategories.packaging]: 'Упаковка подарков',
  [EnumCategories.wedding]: 'Свдебные',
  [EnumCategories.interior]: 'Интерьерные композиции',
  [EnumCategories.individual]: 'Индивидуальный букет',
  [EnumCategories.additionally]: 'Дополнительно',
  [EnumCategories.autumn]: 'Осенние',
  [EnumCategories.prefabricated]: 'Сборные'
};

export type Categories = keyof typeof EnumCategories;
export type CategoriesName = (typeof CATEGORY_NAME)[keyof typeof CATEGORY_NAME];
export type CategoriesParams = (typeof CATEGORY_PARAMS)[keyof typeof CATEGORY_PARAMS];
