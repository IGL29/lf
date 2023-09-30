import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { CounterComponent } from '~components/counter/counter.component';
import { CounterModule } from '~components/counter/counter.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CounterComponent> = {
  title: 'Components/Counter',
  component: CounterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, CounterModule]
    })
  ]
};

export default meta;

type Story = StoryObj<CounterComponent>;

export const Counter: Story = {
  args: {
    min: 0,
    max: 5,
    labelValueA11y: 'Счетчик'
  }
};
