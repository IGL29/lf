import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppContentComponent } from './app-content.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { CounterModule } from '../components/counter/counter.module';
import { IconModule } from '../components/icon/icon.module';
import { ForEntriesModule } from '../directives/for-entries/for-entries.module';
import { HeaderModule } from './shared/header/header.module';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ChangeRouteModule } from '../directives/change-route/change-route.module';
import { VisibilityByScrollModule } from '../directives/visibility-by-scroll/visibility-by-scroll.module';
import { CartMenuContainerModule } from '../containers/cart-menu-container/cart-menu-container.module';
import { NotificationsContainerModule } from '../containers/notifications-container/notifications-container.module';
import { UiButtonModule } from '../directives/ui/ui-button/ui-button.module';
import { BurgerMenuModule } from '~components/burger-menu/burger-menu.module';
import { SidebarModule } from '~components/sidebar/sidebar.module';

@NgModule({
  declarations: [AppContentComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    IconModule,
    CartMenuContainerModule,
    ForEntriesModule,
    SidebarModule,
    BurgerMenuModule,
    CounterModule,
    UiButtonModule,
    NgxMaskPipe,
    ChangeRouteModule,
    VisibilityByScrollModule,
    NotificationsContainerModule
  ],
  providers: [
    provideNgxMask({
      validation: false
    })
  ],
  exports: [AppContentComponent]
})
export class AppContentModule {}
