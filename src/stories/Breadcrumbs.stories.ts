import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';
import { BreadcrumbsComponent } from '~components/breadcrumbs/breadcrumbs.component';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true }
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([{ path: '**', component: BreadcrumbsComponent }])
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<BreadcrumbsComponent>;

export const Breadcrumbs: Story = {
  args: {
    links: [
      { title: 'Главная', url: '/main' },
      { title: 'Каталог', url: '/catalog' },
      { title: 'Страница товара' }
    ]
  },
  argTypes: {
    links: {
      description: '{title: string, url?: string}[]'
    }
  }
};
