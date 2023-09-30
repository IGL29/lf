import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ReviewComponent } from '~components/review/review.component';
import { ReviewModule } from '~components/review/review.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ReviewComponent> = {
  title: 'Components/Review',
  component: ReviewComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, ReviewModule]
    })
  ]
};

export default meta;

type Story = StoryObj<ReviewComponent>;

export const Review: Story = {
  args: {
    author: 'John Doe',
    comment: 'Cool!',
    rating: 5,
    createdAt: new Date()
  }
};
