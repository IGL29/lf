import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { LoaderComponent } from '~components/loader/loader.component';
import { LoaderModule } from '~components/loader/loader.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<LoaderComponent> = {
  title: 'Components/Loader',
  component: LoaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, LoaderModule]
    })
  ]
};

export default meta;

type Story = StoryObj<LoaderComponent>;

export const Loader: Story = {
  args: {}
};
