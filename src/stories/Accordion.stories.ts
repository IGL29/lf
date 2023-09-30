import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { AccordionComponent } from '~components/accordion/accordion.component';
import { AccordionModule } from '~components/accordion/accordion.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<AccordionComponent> = {
  component: AccordionComponent,
  title: 'Components/Accordion',
  parameters: {
    layout: 'centered'
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AccordionModule, BrowserAnimationsModule]
    })
  ]
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const Accordion: Story = {
  render: (args) => ({
    props: { ...args },
    template: `<app-accordion style="width: 300px">
      <button slot="button" style="width: 100%">Button</button>
      <ng-template #bodyContent>
        <div style="padding: 10px; background-color: #444444;">Text content.</div>
      </ng-template>
    </app-accordion>`
  }),
  args: {}
};
