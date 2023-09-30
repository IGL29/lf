import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { NotificationsComponent } from '~components/notifications/notifications.component';
import { NotificationsModule } from '~components/notifications/notifications.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<NotificationsComponent> = {
  title: 'Components/Notifications',
  component: NotificationsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div>${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, NotificationsModule, BrowserAnimationsModule]
    })
  ]
};

export default meta;

type Story = StoryObj<NotificationsComponent>;

export const Notifications: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Заголовок',
        type: 'warn',
        text: 'Дополнительное описание оповещения'
      }
    ]
  }
};

export const NotificationsMoreThanTwo: Story = {
  args: {
    notifications: [
      {
        id: '1',
        title: 'Заголовок',
        type: 'warn',
        text: 'Дополнительное описание оповещения'
      },
      {
        id: '2',
        title: 'Заголовок',
        type: 'warn',
        text: 'Дополнительное описание оповещения'
      },
      {
        id: '3',
        title: 'Заголовок',
        type: 'warn',
        text: 'Дополнительное описание оповещения'
      }
    ]
  }
};
