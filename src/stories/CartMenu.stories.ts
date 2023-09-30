import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { getMockProduct } from '__tests__/mocks/data/product';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';
import { CartMenuComponent } from '~components/cart-menu/cart-menu.component';
import { LoaderModule } from '~components/loader/loader.module';
import { ProductItemModule } from '~components/product-item/product-item.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CartMenuComponent> = {
  title: 'Components/CartMenu',
  component: CartMenuComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator((story) => `<div style="height: calc(100vh - 3rem)">${story}</div>`),
    moduleMetadata({
      imports: [
        CommonModule,
        ProductItemModule,
        UiButtonModule,
        LoaderModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{ path: '**', component: CartMenuComponent }])
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<CartMenuComponent>;

export const CartMenuEmpty: Story = {
  args: {}
};

export const CartMenuWithProducts: Story = {
  args: {
    inCartProducts: [
      { count: 3, product: getMockProduct({ id: 1 }) },
      { count: 2, product: getMockProduct({ id: 2 }) },
      { count: 1, product: getMockProduct({ id: 3 }) },
      { count: 4, product: getMockProduct({ id: 4 }) },
      { count: 2, product: getMockProduct({ id: 5 }) },
      { count: 1, product: getMockProduct({ id: 6 }) },
      { count: 5, product: getMockProduct({ id: 7 }) }
    ],
    cartPrice: 10000
  }
};

export const CartMenuOffersLoading: Story = {
  args: {
    isOfferProductsLoading: true
  }
};

export const CartMenuWithOffers: Story = {
  args: {
    offerProducts: [getMockProduct({ id: 1 }), getMockProduct({ id: 2 }), getMockProduct({ id: 3 })]
  }
};

export const CartMenuWithProductsAndOffers: Story = {
  args: {
    inCartProducts: [
      { count: 3, product: getMockProduct({ id: 1 }) },
      { count: 2, product: getMockProduct({ id: 2 }) },
      { count: 1, product: getMockProduct({ id: 3 }) },
      { count: 4, product: getMockProduct({ id: 4 }) },
      { count: 2, product: getMockProduct({ id: 5 }) },
      { count: 1, product: getMockProduct({ id: 6 }) },
      { count: 5, product: getMockProduct({ id: 7 }) }
    ],
    cartPrice: 5000,
    offerProducts: [getMockProduct({ id: 1 }), getMockProduct({ id: 2 }), getMockProduct({ id: 3 })]
  }
};
