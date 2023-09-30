import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { OPTIONS } from 'src/app/containers/sorting-container/data';
import { SortingComponent } from '~components/sorting/sorting.component';
import { SortingModule } from '~components/sorting/sorting.module';
import type { Meta, StoryObj } from '@storybook/angular';
import type { TargetSort } from 'src/app/containers/sorting-container/types';

const meta: Meta<SortingComponent> = {
  title: 'Components/Sorting',
  component: SortingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 300px;">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, SortingModule]
    })
  ]
};

export default meta;

type Story = StoryObj<SortingComponent<TargetSort>>;

export const SortingDefault: Story = {
  args: {
    options: OPTIONS
  },
  argTypes: {
    options: {
      description: `{
        categoryTitle: string;
        title: string;
        sort: 'sort' | 'desc';
        targetSort: string;
      }`
    },
    defaultTitle: {
      control: {
        type: 'text'
      }
    },
    activeOptionIndex: {
      control: {
        type: 'number',
        min: 0,
        max: OPTIONS.length - 1
      }
    }
  }
};

export const SortingWithActiveOption: Story = {
  args: {
    options: OPTIONS,
    activeOptionIndex: 0
  },
  argTypes: {
    options: {
      description: `{
        categoryTitle: string;
        title: string;
        sort: 'sort' | 'desc';
        targetSort: string;
      }`
    },
    defaultTitle: {
      control: {
        type: 'text'
      }
    },
    activeOptionIndex: {
      control: {
        type: 'number',
        min: 0,
        max: OPTIONS.length - 1
      }
    }
  }
};
