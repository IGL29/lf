import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ErrorBlockComponent } from '~components/error-block/error-block.component';
import { ErrorBlockModule } from '~components/error-block/error-block.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ErrorBlockComponent> = {
  title: 'Components/ErrorBlock',
  component: ErrorBlockComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, ErrorBlockModule]
    })
  ]
};

export default meta;

type Story = StoryObj<ErrorBlockComponent>;

export const ErrorBlock: Story = {
  args: {}
};
