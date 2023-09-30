import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RadioButtonComponent } from '~components/radio-button/radio-button.component';
import { RadioButtonModule } from '~components/radio-button/radio-button.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<RadioButtonComponent> = {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, RadioButtonModule]
    })
  ]
};

export default meta;

type Story = StoryObj<RadioButtonComponent>;

export const RadioButton: Story = {
  args: {
    labelValue: 'Самовывоз',
    attrName: 'delivery',
    attrValue: 'pickup'
  }
};
