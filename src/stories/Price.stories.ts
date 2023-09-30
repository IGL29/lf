import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { PriceComponent } from '~components/price/price.component';
import { PriceModule } from '~components/price/price.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<PriceComponent> = {
  title: 'Components/Price',
  component: PriceComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, PriceModule]
    })
  ]
};

export default meta;

type Story = StoryObj<PriceComponent>;

export const Price: Story = {
  args: {
    price: {
      value: 1500,
      discount: 0
    }
  }
};

export const PriceWithDiscount: Story = {
  args: {
    price: {
      value: 1500,
      discount: 500
    }
  }
};
