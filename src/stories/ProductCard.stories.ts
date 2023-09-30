import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { getMockProduct } from '__tests__/mocks/data/product';
import { ImageUploadStatusModule } from 'src/app/directives/image-upload-status/image-upload-status.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';
import { ProductBadgeColorModule } from 'src/app/pipes/product-badge-color/product-badge-color.module';
import { ProductBadgeTextModule } from 'src/app/pipes/product-badge-text/product-badge-text.module';
import { BadgeModule } from '~components/badge/badge.module';
import { PriceModule } from '~components/price/price.module';
import { ProductCardComponent } from '~components/product-card/product-card.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ProductCardComponent> = {
  title: 'Components/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [
        CommonModule,
        UiButtonModule,
        PriceModule,
        BadgeModule,
        ProductBadgeColorModule,
        ProductBadgeTextModule,
        ImageUploadStatusModule,
        NgOptimizedImage,
        RouterTestingModule.withRoutes([{ path: '**', component: ProductCardComponent }])
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<ProductCardComponent>;

export const ProductCard: Story = {
  args: {
    product: getMockProduct({ id: 1, isNew: false, price: { discount: 0, value: 1000 } })
  }
};

export const ProductCardNew: Story = {
  args: {
    product: getMockProduct({ id: 1, isNew: true, price: { discount: 0, value: 1000 } })
  }
};

export const ProductCardWithDiscount: Story = {
  args: {
    product: getMockProduct({ id: 1, isNew: false, price: { discount: 100, value: 1000 } })
  }
};
