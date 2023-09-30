import { moduleMetadata } from '@storybook/angular';
import { UiButtonDirective } from 'src/app/directives/ui/ui-button/ui-button.directive';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<UiButtonDirective> = {
  title: 'Directives/UiButton',
  component: UiButtonDirective,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    moduleMetadata({
      imports: [UiButtonModule]
    })
  ]
};

export default meta;

type Story = StoryObj<UiButtonDirective>;

export const UiButtonDefault: Story = {
  render: (args) => ({
    props: {
      variant: args['variant']
    },
    template: '<button [appUiButton]="variant">Button</button>'
  }),
  args: {
    variant: ''
  }
};

export const UiButtonVariant1: Story = {
  render: (args) => ({
    props: {
      variant: args['variant']
    },
    template: '<button [appUiButton]="variant">Button</button>'
  }),
  args: {
    variant: '1'
  }
};

export const UiButtonVariant2: Story = {
  render: (args) => ({
    props: {
      variant: args['variant']
    },
    template: '<button [appUiButton]="variant">Button</button>'
  }),
  args: {
    variant: '2'
  }
};

export const UiButtonVariant3: Story = {
  render: (args) => ({
    props: {
      variant: args['variant']
    },
    template: '<button [appUiButton]="variant">Button</button>'
  }),
  args: {
    variant: '3'
  }
};

export const UiButtonVariant4: Story = {
  render: (args) => ({
    props: {
      variant: args['variant']
    },
    template: '<button [appUiButton]="variant">Button</button>'
  }),
  args: {
    variant: '4'
  }
};
