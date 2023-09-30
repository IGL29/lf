import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { RatingComponent } from '~components/rating/rating.component';
import { RatingModule } from '~components/rating/rating.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<RatingComponent> = {
  title: 'Components/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RatingModule]
    })
  ]
};

export default meta;

type Story = StoryObj<RatingComponent>;

export const Rating: Story = {
  args: {}
};
