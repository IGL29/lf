import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { CartButtonComponent } from '~components/cart-button/cart-button.component';
import { CartButtonModule } from '~components/cart-button/cart-button.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CartButtonComponent> = {
  title: 'Components/CartButton',
  component: CartButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CartButtonModule]
    })
  ]
};

export default meta;

type Story = StoryObj<CartButtonComponent>;

export const CartButton: Story = {
  args: {
    count: 1
  },
  argTypes: {
    count: {
      control: {
        type: 'number',
        min: 0
      }
    }
  }
};
