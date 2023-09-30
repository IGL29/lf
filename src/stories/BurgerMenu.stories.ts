import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SearchFormContainerModule } from 'src/app/containers/search-form-container/search-form-container.module';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';
import { BurgerMenuComponent } from '~components/burger-menu/burger-menu.component';
import { IconModule } from '~components/icon/icon.module';
import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<BurgerMenuComponent> = {
  title: 'Components/BurgerMenu',
  component: BurgerMenuComponent,
  tags: ['autodocs'],
  decorators: [
    componentWrapperDecorator((story) => `<div style="height: calc(100vh - 2rem)">${story}</div>`),
    moduleMetadata({
      imports: [
        CommonModule,
        NgxMaskPipe,
        SearchFormContainerModule,
        IconModule,
        ForEntriesModule,
        RouterTestingModule.withRoutes([{ path: '**', component: BurgerMenuComponent }])
      ],
      providers: [provideNgxMask()]
    })
  ]
};

export default meta;

type Story = StoryObj<BurgerMenuComponent>;

export const BurgerMenu: Story = {
  args: {}
};
