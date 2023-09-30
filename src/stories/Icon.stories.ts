import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { IconComponent } from '~components/icon/icon.component';
import { IconModule } from '~components/icon/icon.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="max-width: 40px;">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, IconModule]
    })
  ]
};

export default meta;

type Story = StoryObj<IconComponent>;

export const Icon: Story = {
  args: {
    width: 'full',
    height: 'full',
    icon: 'phone'
  },
  argTypes: {
    icon: {
      description: `arrow-curve
      | arrow-right
      | cart
      | handset
      | instagram
      | logo
      | phone
      | search
      | whatsapp
      | flower`
    },
    width: {
      description: 'full',
      control: {
        type: 'text'
      }
    },
    height: {
      description: 'full',
      control: {
        type: 'text'
      }
    },
    pathFill: {
      control: {
        type: 'color'
      }
    },
    viewBox: {
      description: 'Example: "0 0 40 40"'
    }
  }
};
