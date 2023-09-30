import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { RouterModule } from '@angular/router';
import { IconModule } from 'src/app/components/icon/icon.module';
import { CartButtonModule } from 'src/app/components/cart-button/cart-button.module';
import { DropdownModule } from 'src/app/components/dropdown/dropdown.module';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';
import { SearchFormContainerModule } from 'src/app/containers/search-form-container/search-form-container.module';
import { VisibilityByScrollModule } from 'src/app/directives/visibility-by-scroll/visibility-by-scroll.module';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    ForEntriesModule,
    DropdownModule,
    CartButtonModule,
    SearchFormContainerModule,
    VisibilityByScrollModule,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask({
      validation: false
    })
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
