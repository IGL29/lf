import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ReviewFormComponent } from '~components/review-form/review-form.component';
import { ReviewFormModule } from '~components/review-form/review-form.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<ReviewFormComponent> = {
  title: 'Components/ReviewForm',
  component: ReviewFormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, ReviewFormModule]
    })
  ]
};

export default meta;

type Story = StoryObj<ReviewFormComponent>;

export const ReviewForm: Story = {
  args: {}
};
