import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from '~components/checkbox/checkbox.component';
import { CheckboxModule } from '~components/checkbox/checkbox.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, CheckboxModule]
    })
  ]
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Checkbox: Story = {
  args: {
    labelValue: 'Розы',
    attrValue: 'roses',
    attrName: 'flower'
  }
};
