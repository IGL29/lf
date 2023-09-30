import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { FeedbackFormComponent } from '~components/feedback-form/feedback-form.component';
import { FeedbackFormModule } from '~components/feedback-form/feedback-form.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<FeedbackFormComponent> = {
  title: 'Components/FeedbackForm',
  component: FeedbackFormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="margin: 0 auto">${story}</div>`),
    moduleMetadata({
      imports: [CommonModule, FeedbackFormModule]
    })
  ]
};

export default meta;

type Story = StoryObj<FeedbackFormComponent>;

export const FeedbackForm: Story = {
  args: {}
};

export const FeedbackFormSending: Story = {
  args: {
    isLoading: true
  }
};
