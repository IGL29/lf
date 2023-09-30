import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { RangeComponent } from '~components/range/range.component';
import { RangeModule } from '~components/range/range.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<RangeComponent> = {
  title: 'Components/Range',
  component: RangeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 300px">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, RangeModule]
    })
  ]
};

export default meta;

type Story = StoryObj<RangeComponent>;

export const Range: Story = {
  args: {
    min: 0,
    max: 1000,
    value: { from: 0, to: 1000 },
    gap: 50
  }
};
