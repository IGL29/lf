import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { getMockProduct } from '__tests__/mocks/data/product';
import { CounterModule } from '~components/counter/counter.module';
import { ProductItemComponent } from '~components/product-item/product-item.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ProductItemComponent> = {
  title: 'Components/ProductItem',
  component: ProductItemComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [
        CommonModule,
        CounterModule,
        RouterModule,
        NgOptimizedImage,
        RouterTestingModule.withRoutes([{ path: '**', component: ProductItemComponent }])
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<ProductItemComponent>;

export const ProductItem: Story = {
  args: {
    product: getMockProduct({ id: 1 }),
    count: 3
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 1 }
    }
  }
};
