import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { NotifyComponent } from '~components/notify/notify.component';
import { NotifyModule } from '~components/notify/notify.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<NotifyComponent> = {
  title: 'Components/Notify',
  component: NotifyComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, NotifyModule]
    })
  ]
};

export default meta;

type Story = StoryObj<NotifyComponent>;

export const Notify: Story = {
  args: {
    notify: {
      title: 'Заголовок',
      type: 'warn',
      text: 'Дополнительное описание оповещения'
    }
  }
};
