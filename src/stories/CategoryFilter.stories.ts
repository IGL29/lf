import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';
import { CategoryFilterComponent } from '~components/category-filter/category-filter.component';
import { CategoryFilterModule } from '~components/category-filter/category-filter.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<CategoryFilterComponent> = {
  title: 'Components/CategoryFilter',
  component: CategoryFilterComponent,
  decorators: [
    componentWrapperDecorator((story) => `<div style="height: calc(100vh - 3rem)">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, CategoryFilterModule, UiButtonModule]
    })
  ]
};

export default meta;

type Story = StoryObj<CategoryFilterComponent>;

export const CategoryFilter: Story = {
  args: {
    categories: [
      {
        title: 'Шары',
        paramValue: 'balloon'
      },
      {
        title: 'Дополнительно',
        paramValue: 'additionally'
      },
      {
        title: 'Индивидуальный',
        paramValue: 'individual'
      },
      {
        title: 'Популряное',
        paramValue: 'popular'
      },
      {
        title: 'Подарки',
        paramValue: 'gifts'
      }
    ]
  }
};

export const CategoryFilterWithActiveCategories: Story = {
  args: {
    categories: [
      {
        title: 'Шары',
        paramValue: 'balloon'
      },
      {
        title: 'Дополнительно',
        paramValue: 'additionally'
      },
      {
        title: 'Индивидуальный',
        paramValue: 'individual'
      },
      {
        title: 'Популряное',
        paramValue: 'popular'
      },
      {
        title: 'Подарки',
        paramValue: 'gifts'
      }
    ],
    activeCategories: new Set(['balloon', 'popular'])
  }
};
