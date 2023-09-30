import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { PromocodeFieldComponent } from '~components/promocode-field/promocode-field.component';
import { PromocodeFieldModule } from '~components/promocode-field/promocode-field.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<PromocodeFieldComponent> = {
  title: 'Components/PromocodeField',
  component: PromocodeFieldComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, PromocodeFieldModule]
    })
  ]
};

export default meta;

type Story = StoryObj<PromocodeFieldComponent>;

export const PromocodeField: Story = {
  args: {}
};
