import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from '~components/badge/badge.component';
import { BadgeModule } from '~components/badge/badge.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, BadgeModule]
    })
  ]
};

export default meta;

type Story = StoryObj<BadgeComponent>;

export const Badge: Story = {
  args: {
    text: 'sale',
    bgColor: 'green'
  },
  argTypes: {
    text: {
      control: {
        type: 'text'
      }
    },
    bgColor: {
      control: {
        type: 'radio',
        options: ['green', 'pink', null]
      }
    }
  }
};
