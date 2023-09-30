import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ReviewListComponent } from '~components/review-list/review-list.component';
import { ReviewListModule } from '~components/review-list/review-list.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ReviewListComponent> = {
  title: 'Components/ReviewList',
  component: ReviewListComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, ReviewListModule]
    })
  ]
};

export default meta;

type Story = StoryObj<ReviewListComponent>;

export const ReviewList: Story = {
  args: {
    reviews: [
      {
        author: `John Doe`,
        comment: 'Cool!',
        rating: 5,
        createdAt: new Date()
      },
      {
        author: `john's friend`,
        comment: 'John is right',
        rating: 4,
        createdAt: new Date()
      },
      {
        author: `Alexander N.`,
        comment: 'Absolutly!',
        rating: 3,
        createdAt: new Date()
      }
    ]
  }
};
