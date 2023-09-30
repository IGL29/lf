import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Categories, Color, Flower, Format, IProduct, Light } from '~types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {
  public isHasCategory(product: IProduct, filter: { category: Categories | Categories[] }) {
    const categories = filter['category'];
    if (categories && typeof categories === 'string') {
      return product.categories.some((category) => category === categories);
    }
    if (categories && Array.isArray(categories)) {
      return product.categories.some((category) => categories.some((item) => item === category));
    }
    return true;
  }

  public isHasMinPrice(product: IProduct, filter: { pricefrom: number }) {
    if (filter['pricefrom']) {
      return product.price.value - product.price.discount >= filter['pricefrom'];
    }
    return true;
  }

  public isHasMaxPrice(product: IProduct, filter: { priceto: number }) {
    if (filter['priceto']) {
      return product.price.value - product.price.discount <= filter['priceto'];
    }
    return true;
  }

  public isHasColor(product: IProduct, filter: { color: Color | Color[] }) {
    const colors = filter['color'];
    if (colors && typeof colors === 'string') {
      return product.color === colors;
    }
    if (colors && Array.isArray(colors)) {
      return colors.some((color) => color === product.color);
    }
    return true;
  }

  public isHasLight(product: IProduct, filter: { light: Light | Light[] }) {
    const lights = filter['light'];
    if (lights && typeof lights === 'string') {
      return product.light === lights;
    }
    if (lights && Array.isArray(lights)) {
      return lights.some((light) => light === product.light);
    }
    return true;
  }

  public isHasFormat(product: IProduct, filter: { format: Format | Format[] }) {
    const formats = filter['format'];
    if (formats && typeof formats === 'string') {
      return product.format === formats;
    }
    if (formats && Array.isArray(formats)) {
      return formats.some((format) => format === product.format);
    }
    return true;
  }

  public isHasTitle(product: IProduct, filter: { title: string }) {
    if (filter['title']) {
      return product.title.toLowerCase().includes(filter['title'].toLowerCase());
    }
    return true;
  }

  public isHasFlower(product: IProduct, filter: { flower: Flower | Flower[] }) {
    const flowers = filter['flower'];
    if (flowers && typeof flowers === 'string') {
      return product.flowers.some((flower) => flower === flowers);
    }
    if (flowers && Array.isArray(flowers)) {
      return product.flowers.some((flower) =>
        flowers.some((filterFlower) => filterFlower === flower)
      );
    }
    return true;
  }

  public getFilteredProducts(products: Array<IProduct>, filter: Params): Array<IProduct> {
    const filteredProducts: Array<IProduct> = [];

    products.forEach((product) => {
      if (
        this.isHasCategory(product, <Pick<Params, 'category'>>filter) &&
        this.isHasMinPrice(product, <Pick<Params, 'pricefrom'>>filter) &&
        this.isHasMaxPrice(product, <Pick<Params, 'priceto'>>filter) &&
        this.isHasColor(product, <Pick<Params, 'color'>>filter) &&
        this.isHasLight(product, <Pick<Params, 'light'>>filter) &&
        this.isHasFormat(product, <Pick<Params, 'format'>>filter) &&
        this.isHasFlower(product, <Pick<Params, 'flower'>>filter)
      ) {
        filteredProducts.push(product);
      }
      return true;
    });

    return filteredProducts;
  }
}
