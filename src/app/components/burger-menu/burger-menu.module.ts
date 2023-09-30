import { NgModule } from '@angular/core';
import { BurgerMenuComponent } from './burger-menu.component';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { SearchFormContainerModule } from 'src/app/containers/search-form-container/search-form-container.module';
import { IconModule } from '~components/icon/icon.module';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';

@NgModule({
  declarations: [BurgerMenuComponent],
  imports: [
    CommonModule,
    NgxMaskPipe,
    RouterModule,
    SearchFormContainerModule,
    IconModule,
    ForEntriesModule
  ],
  providers: [
    provideNgxMask({
      validation: false
    })
  ],
  exports: [BurgerMenuComponent]
})
export class BurgerMenuModule {}
