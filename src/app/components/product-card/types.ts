import { IProduct } from '~types/product';

export type ProductCardData = Pick<IProduct, 'id' | 'title' | 'images' | 'price' | 'isNew'>;
