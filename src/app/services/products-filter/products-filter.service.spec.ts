import { TestBed } from '@angular/core/testing';

import { ProductsFilterService } from './products-filter.service';
import { getMockProduct } from '__tests__/mocks/data/product';
import { Categories, Color, Flower, Format, Light } from '~types/product';

const getMockFilterCategory = (categories: Categories | Categories[]) => ({ category: categories });
const getMockFilterColor = (color: Color | Color[]) => ({ color });
const getMockFilterLight = (light: Light | Light[]) => ({ light });
const getMockFilterFormat = (format: Format | Format[]) => ({ format });
const getMockFilterTitle = (title: string) => ({ title });
const getMockFilterFlower = (flower: Flower | Flower[]) => ({ flower });
const getMockFilterPrice = (min: number | null = null, max: number | null = null) =>
  min !== null && max !== null
    ? { pricefrom: min, priceto: max }
    : min !== null
    ? { pricefrom: min }
    : max !== null
    ? { priceto: max }
    : {};

describe('ProductsFilterService', () => {
  let service: ProductsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return true when product containing category', () => {
    expect(
      service.isHasCategory(
        getMockProduct({ categories: ['balloon'] }),
        getMockFilterCategory('balloon')
      )
    ).toBeTrue();
  });

  it('should be return false when product not contain category', () => {
    expect(
      service.isHasCategory(
        getMockProduct({ categories: ['balloon'] }),
        getMockFilterCategory('autumn')
      )
    ).toBeFalse();
  });

  it('should be return true when product match min price', () => {
    expect(
      service.isHasMinPrice(getMockProduct({ price: { value: 150, discount: 0 } }), {
        pricefrom: 100
      })
    ).toBeTrue();
  });

  it('should be return false when product not match min price', () => {
    expect(
      service.isHasMinPrice(getMockProduct({ price: { value: 90, discount: 0 } }), {
        pricefrom: 100
      })
    ).toBeFalse();
  });

  it('should be return false when product not match min price with discount', () => {
    expect(
      service.isHasMinPrice(getMockProduct({ price: { value: 150, discount: 60 } }), {
        pricefrom: 100
      })
    ).toBeFalse();
  });

  it('should be return true when product match max price', () => {
    expect(
      service.isHasMaxPrice(getMockProduct({ price: { value: 150, discount: 0 } }), {
        priceto: 200
      })
    ).toBeTrue();
  });

  it('should be return true when product match max price with discount', () => {
    expect(
      service.isHasMaxPrice(getMockProduct({ price: { value: 250, discount: 50 } }), {
        priceto: 200
      })
    ).toBeTrue();
  });

  it('should be return false when product not match max price', () => {
    expect(
      service.isHasMaxPrice(getMockProduct({ price: { value: 200, discount: 0 } }), {
        priceto: 199
      })
    ).toBeFalse();
  });

  it('should be return true when product containing color', () => {
    expect(
      service.isHasColor(getMockProduct({ color: 'white' }), getMockFilterColor('white'))
    ).toBeTrue();

    expect(
      service.isHasColor(getMockProduct({ color: 'white' }), getMockFilterColor(['white', 'green']))
    ).toBeTrue();
  });

  it('should be return false when product not containing color', () => {
    expect(
      service.isHasColor(getMockProduct({ color: 'white' }), getMockFilterColor('green'))
    ).toBeFalse();

    expect(
      service.isHasColor(
        getMockProduct({ color: 'white' }),
        getMockFilterColor(['green', 'orange'])
      )
    ).toBeFalse();
  });

  it('should be return true when product containing light', () => {
    expect(
      service.isHasLight(getMockProduct({ light: 'bright' }), getMockFilterLight('bright'))
    ).toBeTrue();

    expect(
      service.isHasLight(
        getMockProduct({ light: 'bright' }),
        getMockFilterLight(['gentle', 'bright'])
      )
    ).toBeTrue();
  });

  it('should be return false when product not contain light', () => {
    expect(
      service.isHasLight(getMockProduct({ light: 'bright' }), getMockFilterLight('gentle'))
    ).toBeFalse();

    expect(
      service.isHasLight(getMockProduct({ light: 'bright' }), getMockFilterLight(['gentle']))
    ).toBeFalse();
  });

  it('should be return true when product contain format', () => {
    expect(
      service.isHasFormat(getMockProduct({ format: 'basket' }), getMockFilterFormat('basket'))
    ).toBeTrue();

    expect(
      service.isHasFormat(getMockProduct({ format: 'basket' }), getMockFilterFormat(['basket']))
    ).toBeTrue();
  });

  it('should be return false when product not contain format', () => {
    expect(
      service.isHasFormat(getMockProduct({ format: 'basket' }), getMockFilterFormat('box'))
    ).toBeFalse();

    expect(
      service.isHasFormat(getMockProduct({ format: 'basket' }), getMockFilterFormat(['box']))
    ).toBeFalse();
  });

  it('should be return false when product containing title', () => {
    expect(
      service.isHasTitle(getMockProduct({ title: 'Розы' }), getMockFilterTitle('розы'))
    ).toBeTrue();
  });

  it('should be return false when product not contain title', () => {
    expect(
      service.isHasTitle(getMockProduct({ title: 'Розы' }), getMockFilterTitle('Подорожник'))
    ).toBeFalse();
  });

  it('should be return true when product contain flower', () => {
    expect(
      service.isHasFlower(getMockProduct({ flowers: ['astilba'] }), getMockFilterFlower('astilba'))
    ).toBeTrue();

    expect(
      service.isHasFlower(
        getMockProduct({ flowers: ['astilba'] }),
        getMockFilterFlower(['astilba'])
      )
    ).toBeTrue();
  });

  it('should be return false when product not contain flower', () => {
    expect(
      service.isHasFlower(
        getMockProduct({ flowers: ['astilba'] }),
        getMockFilterFlower('asparagus')
      )
    ).toBeFalse();

    expect(
      service.isHasFlower(
        getMockProduct({ flowers: ['astilba'] }),
        getMockFilterFlower(['asparagus'])
      )
    ).toBeFalse();
  });

  it('should be return products matching filter category', () => {
    expect(
      service.getFilteredProducts(
        [
          getMockProduct({ id: 1, categories: ['autumn'] }),
          getMockProduct({ id: 2, categories: ['balloon'] })
        ],
        getMockFilterCategory('balloon')
      )
    ).toEqual([getMockProduct({ id: 2, categories: ['balloon'] })]);
  });

  it('should be return products matching filter min price', () => {
    expect(
      service.getFilteredProducts(
        [
          getMockProduct({ id: 1, price: { value: 100, discount: 0 } }),
          getMockProduct({ id: 2, price: { value: 200, discount: 0 } })
        ],
        getMockFilterPrice(150)
      )
    ).toEqual([getMockProduct({ id: 2, price: { value: 200, discount: 0 } })]);
  });

  it('should be return products matching filter max price', () => {
    expect(
      service.getFilteredProducts(
        [
          getMockProduct({ id: 1, price: { value: 100, discount: 0 } }),
          getMockProduct({ id: 2, price: { value: 200, discount: 0 } })
        ],
        getMockFilterPrice(null, 150)
      )
    ).toEqual([getMockProduct({ id: 1, price: { value: 100, discount: 0 } })]);
  });

  it('should be return products matching filter color', () => {
    expect(
      service.getFilteredProducts(
        [getMockProduct({ id: 1, color: 'red' }), getMockProduct({ id: 2, color: 'green' })],
        getMockFilterColor('red')
      )
    ).toEqual([getMockProduct({ id: 1, color: 'red' })]);
  });

  it('should be return products matching filter light', () => {
    expect(
      service.getFilteredProducts(
        [getMockProduct({ id: 1, light: 'bright' }), getMockProduct({ id: 2, light: 'gentle' })],
        getMockFilterLight('bright')
      )
    ).toEqual([getMockProduct({ id: 1, light: 'bright' })]);
  });

  it('should be return products matching filter format', () => {
    expect(
      service.getFilteredProducts(
        [getMockProduct({ id: 1, format: 'basket' }), getMockProduct({ id: 2, format: 'bouquet' })],
        getMockFilterFormat('basket')
      )
    ).toEqual([getMockProduct({ id: 1, format: 'basket' })]);
  });

  it('should be return products matching filter flower', () => {
    expect(
      service.getFilteredProducts(
        [
          getMockProduct({ id: 1, flowers: ['anthurium'] }),
          getMockProduct({ id: 2, flowers: ['asparagus'] })
        ],
        getMockFilterFlower('anthurium')
      )
    ).toEqual([getMockProduct({ id: 1, flowers: ['anthurium'] })]);
  });
});
