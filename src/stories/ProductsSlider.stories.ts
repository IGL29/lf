import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { getMockProduct } from '__tests__/mocks/data/product';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';
import { IconModule } from '~components/icon/icon.module';
import { LoaderModule } from '~components/loader/loader.module';
import { ProductCardModule } from '~components/product-card/product-card.module';
import { ProductsSliderComponent } from '~components/products-slider/products-slider.component';
import { SlideModule } from '~components/slide/slide.module';
import { SliderModule } from '~components/slider/slider.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ProductsSliderComponent> = {
  title: 'Components/ProductsSlider',
  component: ProductsSliderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [
        CommonModule,
        ProductCardModule,
        SliderModule,
        IconModule,
        UiButtonModule,
        LoaderModule,
        SlideModule,
        RouterTestingModule.withRoutes([{ path: '**', component: ProductsSliderComponent }])
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<ProductsSliderComponent>;

export const ProductsSlider: Story = {
  args: {
    products: [
      getMockProduct({ id: 1 }),
      getMockProduct({ id: 2 }),
      getMockProduct({ id: 3 }),
      getMockProduct({ id: 4 }),
      getMockProduct({ id: 5 })
    ]
  }
};

export const ProductsSliderLoading: Story = {
  args: {
    products: [],
    isLoading: true
  }
};
