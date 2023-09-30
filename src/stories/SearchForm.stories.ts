import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { SearchFormComponent } from '~components/search-form/search-form.component';
import { SearchFormModule } from '~components/search-form/search-form.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<SearchFormComponent> = {
  title: 'Components/SearchForm',
  component: SearchFormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, SearchFormModule]
    })
  ]
};

export default meta;

type Story = StoryObj<SearchFormComponent>;

export const SearchForm: Story = {
  args: {}
};
