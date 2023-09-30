import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppContentModule } from './page-components/app-content.module';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products/products.effects';
import { AppEffects } from './store/app/app.effects';
import { CartEffects } from './store/cart/cart.effects';
import { FeedbackEffects } from './store/feedback/feedback.effects';
import { OrderEffects } from './store/order/order.effects';
import { CorporateEffects } from './store/corporate/corporate.effects';
import { NotificationsEffects } from './store/notifications/notifications.effects';
import { WINDOW_TOKEN } from './tokens/window';
import { LOCAL_STORAGE_TOKEN } from './tokens/localStorage';
import { rootReducer } from './store/root.reducer';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppContentModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      name: 'NGRX LOVER FLOWER STORE',
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: true,
      trace: true
    }),
    EffectsModule.forRoot([
      ProductsEffects,
      CartEffects,
      FeedbackEffects,
      OrderEffects,
      CorporateEffects,
      NotificationsEffects,
      AppEffects
    ])
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    {
      provide: LOCAL_STORAGE_TOKEN,
      useFactory: () => localStorage
    },
    {
      provide: WINDOW_TOKEN,
      useFactory: () => window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
